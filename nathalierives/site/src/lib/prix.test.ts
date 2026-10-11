import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { prixUS, type PiecePourPrix, type ReglagesPrix } from './prix';

const fichier = parse(readFileSync(new URL('../donnees/reglages-prix.yaml', import.meta.url), 'utf8')) as ReglagesPrix;

/** Réglages du fichier, avec la règle de TVA et le taux renseignés. */
function reglages(modif: (r: ReglagesPrix) => void = () => {}): ReglagesPrix {
  const r = structuredClone(fichier);
  r.regle_tva.statut = 'marge';
  r.taux_de_change.eur_vers_usd = 1.1;
  r.taux_de_change.date = '2026-10-11';
  modif(r);
  return r;
}

const applique: PiecePourPrix = {
  prix_ttc_eur: 1200,
  prix_export_ht_eur: 1000,
  type_douanier: 'luminaire',
  taille_envoi: 'petite',
  bois: false,
  usd_valide: true,
};

describe('aucun prix en dollars sans les conditions du brief', () => {
  it('le fichier livré attend encore la règle de TVA', () => {
    expect(prixUS(applique, fichier)).toEqual({ kind: 'sans_prix_usd', prix_galerie_eur: 1200, raison: 'regle_tva' });
  });

  it('sans taux de change', () => {
    const r = reglages((r) => (r.taux_de_change.eur_vers_usd = null));
    expect(prixUS(applique, r)).toMatchObject({ kind: 'sans_prix_usd', raison: 'taux_de_change' });
  });

  it('sans validation de Nathalie', () => {
    expect(prixUS({ ...applique, usd_valide: false }, reglages())).toMatchObject({ kind: 'sans_prix_usd', raison: 'non_valide' });
  });

  it('ne convertit jamais le prix TTC : sans prix export, pas de dollars', () => {
    const p = prixUS({ ...applique, prix_export_ht_eur: null }, reglages());
    expect(p).toEqual({ kind: 'sans_prix_usd', prix_galerie_eur: 1200, raison: 'prix_export_absent' });
  });
});

describe('prix de la pièce et droits', () => {
  it('convertit le prix export et affiche les droits en chiffres', () => {
    const p = prixUS(applique, reglages());
    expect(p).toMatchObject({ kind: 'prix_usd', prix_usd: 1100 });
    if (p.kind !== 'prix_usd') throw new Error();
    expect(p.droits).toEqual({ kind: 'chiffre', montant_usd: 110, taux: 0.1, verifies_le: '2026-10-10' });
  });

  it('15 % pour un siège rembourré à structure bois', () => {
    const p = prixUS({ ...applique, type_douanier: 'siege_rembourre_bois', taille_envoi: 'moyenne' }, reglages());
    if (p.kind !== 'prix_usd') throw new Error();
    expect(p.droits).toMatchObject({ kind: 'chiffre', montant_usd: 165 });
  });

  it('type sans taux vérifié (verre, art, vaisselle…) : droits sur demande', () => {
    const p = prixUS({ ...applique, type_douanier: null }, reglages());
    if (p.kind !== 'prix_usd') throw new Error();
    expect(p.droits).toEqual({ kind: 'sur_demande' });
  });

  it('antiquité sans preuve écrite : jamais 0 %, droits sur demande', () => {
    const p = prixUS({ ...applique, type_douanier: 'antiquite' }, reglages());
    if (p.kind !== 'prix_usd') throw new Error();
    expect(p.droits).toEqual({ kind: 'sur_demande' });
    const q = prixUS({ ...applique, type_douanier: 'antiquite', preuve_antiquite: true }, reglages());
    if (q.kind !== 'prix_usd') throw new Error();
    expect(q.droits).toMatchObject({ kind: 'chiffre', montant_usd: 0 });
  });

  it('suit le pas d’arrondi des réglages', () => {
    const p = prixUS({ ...applique, prix_export_ht_eur: 1003 }, reglages((r) => (r.arrondi_usd.pas = 10)));
    expect(p).toMatchObject({ prix_usd: 1100 });
  });
});

describe('livraison à New York', () => {
  it('forfait encore estimé : livraison sur demande, pas de total', () => {
    const p = prixUS(applique, reglages());
    if (p.kind !== 'prix_usd') throw new Error();
    expect(p.livraison).toEqual({ kind: 'sur_demande', raison: 'forfait_non_confirme' });
  });

  it('taille inconnue : livraison sur demande', () => {
    const p = prixUS({ ...applique, taille_envoi: null }, reglages((r) => (r.forfaits_new_york.petite.statut = 'confirmé')));
    if (p.kind !== 'prix_usd') throw new Error();
    expect(p.livraison).toMatchObject({ kind: 'sur_demande', raison: 'taille_inconnue' });
  });

  it('forfait confirmé, petite pièce sous le seuil : toutes les lignes', () => {
    const r = reglages((r) => (r.forfaits_new_york.petite.statut = 'confirmé'));
    const p = prixUS(applique, r);
    if (p.kind !== 'prix_usd' || p.livraison.kind !== 'total') throw new Error();
    // assurance : max(1 % × 1 100 ; 12 € × 1,1) = 13,20 $
    expect(p.livraison.assurance_usd).toBe(13.2);
    // MPF 2,77 $ ; avance des droits : max(2 % × (110 + 2,77) ; 17 € × 1,1 = 18,70 $)
    expect(p.livraison.frais).toEqual([
      { nom: 'Frais de traitement douanier (entrée simplifiée)', montant_usd: 2.77 },
      { nom: "Frais d'avance des droits par le transporteur", montant_usd: 18.7 },
    ]);
    expect(p.livraison.livraison_usd).toBe(Math.round(510 + 13.2 + 2.77 + 18.7));
    expect(p.livraison.total_livre_usd).toBe(1100 + 110 + p.livraison.livraison_usd);
  });

  it('au-dessus de 2 500 $ : entrée formelle, caution, courtier, Lacey si bois', () => {
    const r = reglages((r) => (r.forfaits_new_york.grande.statut = 'confirmé'));
    const enfilade: PiecePourPrix = { ...applique, prix_export_ht_eur: 10000, type_douanier: 'meuble', taille_envoi: 'grande', bois: true };
    const p = prixUS(enfilade, r);
    if (p.kind !== 'prix_usd' || p.livraison.kind !== 'total') throw new Error();
    const noms = p.livraison.frais.map((f) => f.nom);
    expect(noms).toContain('Déclaration Lacey (meubles en bois)');
    expect(noms).toContain('Caution douanière');
    // V = 11 000 $ ; droits 1 100 $ ; MPF = 0,3464 % × 11 000 = 38,10 $
    expect(p.livraison.frais[0]).toEqual({ nom: 'Frais de traitement douanier (entrée formelle)', montant_usd: 38.1 });
    // Garde-fou du brief : sans les frais selon le prix, le total serait trop bas.
    const horsFrais = p.prix_usd + 1100 + 3990;
    expect(p.livraison.total_livre_usd - horsFrais).toBeGreaterThan(200);
    const sansBois = prixUS({ ...enfilade, bois: false }, r);
    if (sansBois.kind !== 'prix_usd' || sansBois.livraison.kind !== 'total') throw new Error();
    expect(sansBois.livraison.frais.map((f) => f.nom)).not.toContain('Déclaration Lacey (meubles en bois)');
  });

  it('droits sur demande : pas de total même si le forfait est confirmé', () => {
    const r = reglages((r) => (r.forfaits_new_york.petite.statut = 'confirmé'));
    const p = prixUS({ ...applique, type_douanier: null }, r);
    if (p.kind !== 'prix_usd') throw new Error();
    expect(p.livraison).toMatchObject({ kind: 'sur_demande', raison: 'droits_sur_demande' });
  });
});
