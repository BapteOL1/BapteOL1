/**
 * Prix pour les États-Unis : prix de la pièce en dollars, droits de douane
 * estimés, livraison à New York. Tout vient de src/donnees/reglages-prix.yaml.
 *
 * Règles du brief :
 * - jamais de conversion du prix TTC en dollars : seul le prix export hors
 *   TVA, saisi sur la fiche et validé par Nathalie, est converti ;
 * - pas de prix en dollars tant que la règle de TVA n'est pas connue ;
 * - les droits s'affichent toujours en chiffres quand le type a un taux
 *   vérifié, sinon « sur demande » ;
 * - pas de total livré tant que le forfait de la taille n'est pas confirmé.
 */

export type Taille = 'petite' | 'moyenne' | 'grande';
export type StatutForfait = 'estimation' | 'confirmé';

export interface TypeDouanier {
  fr: string;
  en: string;
  taux: number;
  preuve_exigee?: boolean;
}

export interface LigneFrais {
  nom: string;
  code?: string;
  forfait_usd?: number;
  base?: 'valeur' | 'droits_plus_mpf' | 'valeur_plus_droits';
  taux?: number;
  minimum_usd?: number;
  minimum_eur?: number;
  maximum_usd?: number;
  si?: 'bois';
}

export interface ReglagesPrix {
  taux_de_change: { eur_vers_usd: number | null; date: string | null; source?: string };
  regle_tva: { statut: string };
  arrondi_usd: { pas: number };
  droits_de_douane: { verifies_le: string; types: Record<string, TypeDouanier> };
  forfaits_new_york: Record<Taille, { montant_usd: number | null; statut: StatutForfait; date: string | null }>;
  frais_selon_le_prix: {
    seuil_usd: number;
    assurance: { taux: number; minimum_eur: number };
    jusqu_au_seuil: LigneFrais[];
    au_dessus_du_seuil: LigneFrais[];
  };
}

export interface PiecePourPrix {
  prix_ttc_eur: number | null;
  prix_export_ht_eur: number | null;
  /** Clé de droits_de_douane.types, ou null si le type n'est pas connu. */
  type_douanier: string | null;
  taille_envoi: Taille | null;
  /** Meuble contenant du bois (déclaration Lacey). */
  bois: boolean;
  /** Preuve écrite de plus de 100 ans (seulement pour le type antiquité). */
  preuve_antiquite?: boolean;
  /** Nathalie a validé le prix export, le type douanier et la taille d'envoi. */
  usd_valide: boolean;
}

export type Droits =
  | { kind: 'chiffre'; montant_usd: number; taux: number; verifies_le: string }
  | { kind: 'sur_demande' };

export type Livraison =
  | { kind: 'sur_demande'; raison: 'taille_inconnue' | 'forfait_non_confirme' | 'droits_sur_demande' }
  | {
      kind: 'total';
      forfait_usd: number;
      assurance_usd: number;
      frais: { nom: string; montant_usd: number }[];
      livraison_usd: number;
      total_livre_usd: number;
      forfait_date: string | null;
    };

export type PrixUS =
  | {
      kind: 'sans_prix_usd';
      /** Prix TTC affiché comme « prix à la galerie de Lyon ». */
      prix_galerie_eur: number | null;
      raison: 'regle_tva' | 'taux_de_change' | 'non_valide' | 'prix_export_absent';
    }
  | { kind: 'prix_usd'; prix_usd: number; droits: Droits; livraison: Livraison };

const centimes = (x: number) => Math.round(x * 100) / 100;

export function arrondir(usd: number, pas: number): number {
  const p = pas > 0 ? pas : 1;
  return Math.round(usd / p) * p;
}

export function droitsPour(piece: PiecePourPrix, valeur_usd: number, r: ReglagesPrix): Droits {
  const type = piece.type_douanier ? r.droits_de_douane.types[piece.type_douanier] : undefined;
  if (!type) return { kind: 'sur_demande' };
  if (type.preuve_exigee && !piece.preuve_antiquite) return { kind: 'sur_demande' };
  return {
    kind: 'chiffre',
    montant_usd: Math.round(valeur_usd * type.taux),
    taux: type.taux,
    verifies_le: r.droits_de_douane.verifies_le,
  };
}

/** Assurance, frais de douane et de courtier : dépendent du prix de la pièce. */
export function fraisSelonLePrix(
  valeur_usd: number,
  droits_usd: number,
  bois: boolean,
  r: ReglagesPrix,
): { assurance_usd: number; frais: { nom: string; montant_usd: number }[] } {
  const fx = r.taux_de_change.eur_vers_usd ?? 0;
  const f = r.frais_selon_le_prix;
  const assurance_usd = centimes(Math.max(f.assurance.taux * valeur_usd, f.assurance.minimum_eur * fx));
  const lignes = valeur_usd <= f.seuil_usd ? f.jusqu_au_seuil : f.au_dessus_du_seuil;
  let mpf = 0;
  const frais: { nom: string; montant_usd: number }[] = [];
  for (const l of lignes) {
    if (l.si === 'bois' && !bois) continue;
    let m: number;
    if (l.forfait_usd !== undefined) {
      m = l.forfait_usd;
    } else {
      const base =
        l.base === 'droits_plus_mpf' ? droits_usd + mpf : l.base === 'valeur_plus_droits' ? valeur_usd + droits_usd : valeur_usd;
      m = (l.taux ?? 0) * base;
    }
    if (l.minimum_usd !== undefined) m = Math.max(m, l.minimum_usd);
    if (l.minimum_eur !== undefined) m = Math.max(m, l.minimum_eur * fx);
    if (l.maximum_usd !== undefined) m = Math.min(m, l.maximum_usd);
    m = centimes(m);
    if (l.code === 'mpf') mpf = m;
    frais.push({ nom: l.nom, montant_usd: m });
  }
  return { assurance_usd, frais };
}

export function prixUS(piece: PiecePourPrix, r: ReglagesPrix): PrixUS {
  const sans = (raison: Extract<PrixUS, { kind: 'sans_prix_usd' }>['raison']): PrixUS => ({
    kind: 'sans_prix_usd',
    prix_galerie_eur: piece.prix_ttc_eur,
    raison,
  });
  if (!['marge', 'normale', 'mixte'].includes(r.regle_tva.statut)) return sans('regle_tva');
  const fx = r.taux_de_change.eur_vers_usd;
  if (!fx || fx <= 0) return sans('taux_de_change');
  if (!piece.usd_valide) return sans('non_valide');
  if (piece.prix_export_ht_eur === null || piece.prix_export_ht_eur <= 0) return sans('prix_export_absent');

  const prix_usd = arrondir(piece.prix_export_ht_eur * fx, r.arrondi_usd.pas);
  const droits = droitsPour(piece, prix_usd, r);

  let livraison: Livraison;
  if (!piece.taille_envoi) {
    livraison = { kind: 'sur_demande', raison: 'taille_inconnue' };
  } else if (r.forfaits_new_york[piece.taille_envoi].statut !== 'confirmé' || r.forfaits_new_york[piece.taille_envoi].montant_usd === null) {
    livraison = { kind: 'sur_demande', raison: 'forfait_non_confirme' };
  } else if (droits.kind !== 'chiffre') {
    livraison = { kind: 'sur_demande', raison: 'droits_sur_demande' };
  } else {
    const forfait = r.forfaits_new_york[piece.taille_envoi];
    const { assurance_usd, frais } = fraisSelonLePrix(prix_usd, droits.montant_usd, piece.bois, r);
    const livraison_usd = Math.round((forfait.montant_usd as number) + assurance_usd + frais.reduce((s, x) => s + x.montant_usd, 0));
    livraison = {
      kind: 'total',
      forfait_usd: forfait.montant_usd as number,
      assurance_usd,
      frais,
      livraison_usd,
      total_livre_usd: prix_usd + droits.montant_usd + livraison_usd,
      forfait_date: forfait.date,
    };
  }
  return { kind: 'prix_usd', prix_usd, droits, livraison };
}
