// ─── Neighborhoods ──────────────────────────────────────────────────────────

export const neighborhoodData = [
  {
    id: '1',
    name: "Hell's Kitchen",
    borough: 'Manhattan',
    avgRent: '$2,800/mo',
    commute: '12 min',
    score: 8.7,
    scoreColor: '#4aaa76',
    tags: ['Safe', 'Good transit', 'Young professionals'],
  },
  {
    id: '2',
    name: 'Astoria',
    borough: 'Queens',
    avgRent: '$2,200/mo',
    commute: '28 min',
    score: 8.2,
    scoreColor: '#d4b98a',
    tags: ['Diverse', 'Affordable', 'Food scene'],
  },
  {
    id: '3',
    name: 'Jersey City',
    borough: 'New Jersey',
    avgRent: '$2,400/mo',
    commute: '22 min',
    score: 7.9,
    scoreColor: '#d4b98a',
    tags: ['Waterfront', 'Growing', 'PATH access'],
  },
  {
    id: '4',
    name: 'Long Island City',
    borough: 'Queens',
    avgRent: '$2,600/mo',
    commute: '18 min',
    score: 8.1,
    scoreColor: '#d4b98a',
    tags: ['Modern buildings', 'Art scene', 'Waterfront'],
  },
  {
    id: '5',
    name: 'Bushwick',
    borough: 'Brooklyn',
    avgRent: '$2,100/mo',
    commute: '35 min',
    score: 7.5,
    scoreColor: '#e8954a',
    tags: ['Creative', 'Nightlife', 'Artists'],
  },
];

// ─── Service Providers ───────────────────────────────────────────────────────

export interface ServiceProvider {
  id: string;
  name: string;
  initials: string;
  color: string;
  price: string;
  priceNote: string;
  rating: number;
  reviews: string;
  features: string[];
  recommended?: boolean;
  selected?: boolean;
}

export interface ServiceCategory {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  currentProvider: string;
  status: 'booked' | 'active' | 'alert' | 'pending' | 'included';
  statusLabel: string;
  monthlyCost?: string;
  providers: ServiceProvider[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'moving',
    icon: 'cube-outline',
    iconColor: '#c8a97a',
    title: 'Déménagement',
    currentProvider: 'FlatRate Moving',
    status: 'booked',
    statusLabel: 'Réservé',
    monthlyCost: '$1,200',
    providers: [
      {
        id: 'flatrate',
        name: 'FlatRate Moving',
        initials: 'FR',
        color: '#c8a97a',
        price: '$1,200',
        priceNote: 'Devis confirmé · Confirmation #FR-29841',
        rating: 4.8,
        reviews: '2.1k',
        features: [
          'April 1, 9:00 AM — confirmé',
          'Assurance incluse jusqu\'à $50k',
          'Emballage professionnel disponible',
          'Camion dédié (pas de partage)',
        ],
        selected: true,
        recommended: true,
      },
      {
        id: 'twoMen',
        name: 'Two Men and a Truck',
        initials: 'TM',
        color: '#5b9ef5',
        price: '$1,400',
        priceNote: 'Estimation · À confirmer',
        rating: 4.5,
        reviews: '890',
        features: [
          'Disponible April 1',
          'Assurance incluse jusqu\'à $30k',
          'Emballage en option (+$200)',
          'Équipe de 2 déménageurs',
        ],
      },
      {
        id: 'uhaul',
        name: 'U-Haul (location)',
        initials: 'UH',
        color: '#e8954a',
        price: '$350',
        priceNote: '+ carburant estimé $60',
        rating: 3.9,
        reviews: '5.2k',
        features: [
          'Camion 20 pieds disponible',
          'Kilométrage illimité',
          'Équipement de déménagement inclus',
          'Option économique — vous conduisez',
        ],
      },
    ],
  },
  {
    id: 'electricity',
    icon: 'flash-outline',
    iconColor: '#e8954a',
    title: 'Électricité',
    currentProvider: 'Con Edison',
    status: 'alert',
    statusLabel: 'Non activé — urgent',
    providers: [
      {
        id: 'coned',
        name: 'Con Edison',
        initials: 'CE',
        color: '#e8954a',
        price: '~$150–400/mo',
        priceNote: 'Selon consommation · Activation 3–5 jours ouvrés',
        rating: 4.2,
        reviews: '2.4k',
        features: [
          'Seul fournisseur disponible dans votre zone',
          'Délai d\'activation : 3–5 jours ouvrés',
          'App mobile + paiement automatique',
          'Compte en ligne en 10 min',
        ],
        recommended: true,
      },
    ],
  },
  {
    id: 'internet',
    icon: 'wifi-outline',
    iconColor: '#5b9ef5',
    title: 'Internet',
    currentProvider: 'Verizon Fios',
    status: 'pending',
    statusLabel: 'Installation à planifier',
    monthlyCost: '$80/mo',
    providers: [
      {
        id: 'fios',
        name: 'Verizon Fios',
        initials: 'VZ',
        color: '#c0503e',
        price: '$80/mo',
        priceNote: '300 Mbps · sans engagement · box TV incluse',
        rating: 4.6,
        reviews: '3.1k',
        features: [
          'Fibre optique 100% dédiée',
          'Technicien requis — planifier rapidement',
          'Débits symétriques upload/download',
          'Sans coupure garantie 99.9%',
        ],
        recommended: true,
        selected: true,
      },
      {
        id: 'spectrum',
        name: 'Spectrum',
        initials: 'SP',
        color: '#c8a97a',
        price: '$70/mo',
        priceNote: '200 Mbps · engagement 12 mois',
        rating: 3.8,
        reviews: '1.8k',
        features: [
          'Câble coaxial (pas fibre)',
          'Self-install kit disponible',
          'Prix promotionnel 12 mois puis $90/mo',
          'Couverture large Manhattan',
        ],
      },
      {
        id: 'optimum',
        name: 'Optimum',
        initials: 'OP',
        color: '#4aaa76',
        price: '$65/mo',
        priceNote: '200 Mbps · engagement 12 mois',
        rating: 3.5,
        reviews: '940',
        features: [
          'Câble coaxial',
          'Couverture à vérifier pour votre adresse',
          'Technicien ou self-install',
          'Option la moins chère',
        ],
      },
    ],
  },
  {
    id: 'insurance',
    icon: 'shield-checkmark-outline',
    iconColor: '#4aaa76',
    title: 'Assurance locataire',
    currentProvider: 'Lemonade',
    status: 'active',
    statusLabel: 'Actif',
    monthlyCost: '$15/mo',
    providers: [
      {
        id: 'lemonade',
        name: 'Lemonade',
        initials: 'LM',
        color: '#ff3860',
        price: '$15/mo',
        priceNote: 'Couverture $25,000 · Responsabilité $100k',
        rating: 4.7,
        reviews: '12k',
        features: [
          'Couverture immédiate après souscription',
          'Remboursement en 3 minutes via app',
          'Requis et validé par votre bail',
          '100% digital — zéro paperasse',
        ],
        selected: true,
        recommended: true,
      },
      {
        id: 'stateFarm',
        name: 'State Farm',
        initials: 'SF',
        color: '#c0503e',
        price: '$22/mo',
        priceNote: 'Couverture $50,000 · Responsabilité $300k',
        rating: 4.4,
        reviews: '8.5k',
        features: [
          'Couverture plus étendue',
          'Agent local disponible',
          'Objets de valeur couverts séparément',
          'Déductible configurable',
        ],
      },
    ],
  },
  {
    id: 'water',
    icon: 'water-outline',
    iconColor: '#5b9ef5',
    title: 'Eau & Gaz',
    currentProvider: 'NYC DEP / National Grid',
    status: 'included',
    statusLabel: 'Inclus dans le loyer',
    providers: [
      {
        id: 'nycdep',
        name: 'NYC DEP (eau)',
        initials: 'NY',
        color: '#5b9ef5',
        price: 'Inclus',
        priceNote: 'Géré par le propriétaire · Aucune action requise',
        rating: 4.0,
        reviews: '—',
        features: [
          'Inclus dans votre loyer mensuel',
          'Facturé directement au propriétaire',
          'Aucune démarche de votre côté',
          'Eau chaude et froide couverte',
        ],
        selected: true,
      },
      {
        id: 'nationalGrid',
        name: 'National Grid (gaz)',
        initials: 'NG',
        color: '#c8a97a',
        price: '~$50–150/mo',
        priceNote: 'Si applicable selon votre appartement',
        rating: 4.1,
        reviews: '1.2k',
        features: [
          'Vérifier si votre apt utilise le gaz',
          'Activation : 3–5 jours ouvrés',
          'Pour cuisinière ou chauffage au gaz',
          'Compte en ligne disponible',
        ],
      },
    ],
  },
];

// ─── Budget ──────────────────────────────────────────────────────────────────

export interface Expense {
  id: string;
  label: string;
  amount: number;
  color: string;
  barWidth: number;
  warning?: boolean;
}

export const monthlyExpenses: Expense[] = [
  { id: 'm1', label: 'Rent', amount: 3380, color: '#c8a97a', barWidth: 1.0 },
  { id: 'm2', label: 'Internet', amount: 80, color: '#5b9ef5', barWidth: 0.024 },
  { id: 'm3', label: 'MTA Pass', amount: 134, color: '#d4b98a', barWidth: 0.04 },
  { id: 'm4', label: 'Electricity', amount: 0, color: '#e8954a', barWidth: 0, warning: true },
  { id: 'm5', label: 'Renters Insurance', amount: 15, color: '#4aaa76', barWidth: 0.004 },
];

export const upfrontExpenses: Expense[] = [
  { id: 'u1', label: 'First month rent', amount: 3380, color: '#c8a97a', barWidth: 0.4 },
  { id: 'u2', label: 'Security deposit', amount: 3380, color: '#d4b98a', barWidth: 0.4 },
  { id: 'u3', label: 'Moving company', amount: 1200, color: '#5b9ef5', barWidth: 0.142 },
  { id: 'u4', label: 'Building fee', amount: 350, color: '#e8954a', barWidth: 0.041 },
  { id: 'u5', label: 'Utility deposit', amount: 150, color: '#4aaa76', barWidth: 0.018 },
];

// ─── Timeline ────────────────────────────────────────────────────────────────

export interface Task {
  id: string;
  title: string;
  dueLabel: string;
  dueColor: string;
  dueBg?: string;
  completed: boolean;
  description: string;
  whyItMatters: string;
  actionLabel: string;
  category: string;
}

export interface TaskGroup {
  id: string;
  title: string;
  tasks: Task[];
}

export const initialTimelineGroups: TaskGroup[] = [
  {
    id: 'this-week',
    title: 'Cette semaine',
    tasks: [
      {
        id: 't1',
        title: 'Activer Con Edison',
        dueLabel: 'AUJOURD\'HUI',
        dueColor: '#c0503e',
        dueBg: '#2a1520',
        completed: false,
        description: 'Activer votre compte Con Edison pour le 350 W 42nd St, Apt 12B.',
        whyItMatters:
          'Sans activation, vous n\'aurez pas d\'électricité le jour du déménagement (1er avril). Con Edison nécessite 3 à 5 jours ouvrés pour traiter les nouveaux comptes.',
        actionLabel: 'Activer maintenant',
        category: 'electricity',
      },
      {
        id: 't2',
        title: 'Réserver l\'ascenseur de service',
        dueLabel: '28 avr.',
        dueColor: 'rgba(255,255,255,0.9)',
        completed: false,
        description: 'Contacter la gestion de l\'immeuble pour réserver l\'ascenseur de fret le jour du déménagement.',
        whyItMatters:
          'La plupart des immeubles de Manhattan exigent une réservation d\'ascenseur à l\'avance. Déménager sans réservation peut entraîner des retards et des frais supplémentaires.',
        actionLabel: 'Contacter l\'immeuble',
        category: 'moving',
      },
      {
        id: 't3',
        title: 'Signer le bail',
        dueLabel: 'Complété',
        dueColor: '#4aaa76',
        dueBg: '#1a2a1a',
        completed: true,
        description: 'Signer le contrat de bail pour le 350 W 42nd St.',
        whyItMatters: 'Votre bail est signé et votre location est légalement établie.',
        actionLabel: 'Voir le bail',
        category: 'lease',
      },
    ],
  },
  {
    id: 'next-week',
    title: 'Semaine prochaine',
    tasks: [
      {
        id: 't4',
        title: 'Planifier installation Verizon Fios',
        dueLabel: '30 avr.',
        dueColor: 'rgba(255,255,255,0.9)',
        completed: false,
        description: 'Planifier l\'installation de Verizon Fios pour votre nouvel appartement.',
        whyItMatters:
          'L\'installation Fios nécessite une visite d\'un technicien. Réservez tôt pour obtenir votre créneau préféré — les créneaux se remplissent vite à Hell\'s Kitchen.',
        actionLabel: 'Planifier l\'installation',
        category: 'internet',
      },
      {
        id: 't5',
        title: 'Souscrire assurance locataire',
        dueLabel: '1 mai',
        dueColor: 'rgba(255,255,255,0.9)',
        completed: false,
        description: 'Souscrire une assurance locataire avant votre date d\'emménagement.',
        whyItMatters:
          'Votre bail exige une preuve d\'assurance locataire. Lemonade propose des plans à partir de $15/mois avec couverture le jour même.',
        actionLabel: 'Obtenir un devis',
        category: 'insurance',
      },
      {
        id: 't6',
        title: 'Déménageurs FlatRate confirmés',
        dueLabel: 'Complété',
        dueColor: '#4aaa76',
        dueBg: '#1a2a1a',
        completed: true,
        description: 'FlatRate Moving réservé pour le 1er avril à 9h00.',
        whyItMatters: 'Vos déménageurs sont confirmés. Confirmation #FR-29841.',
        actionLabel: 'Voir la confirmation',
        category: 'moving',
      },
    ],
  },
  {
    id: 'after-move',
    title: 'Après l\'emménagement',
    tasks: [
      {
        id: 't7',
        title: 'Ouverture fenêtre de renouvellement',
        dueLabel: '1 oct.',
        dueColor: 'rgba(255,255,255,0.9)',
        completed: false,
        description:
          'Votre propriétaire doit fournir les conditions de renouvellement 90 à 150 jours avant la fin du bail.',
        whyItMatters:
          'La loi de NYC oblige les propriétaires à proposer les renouvellements avec un préavis. Utilisez cette fenêtre pour négocier le loyer avant d\'accepter.',
        actionLabel: 'Définir un rappel',
        category: 'lease',
      },
      {
        id: 't8',
        title: 'Fermeture fenêtre de résiliation',
        dueLabel: '1 oct.',
        dueColor: 'rgba(255,255,255,0.9)',
        completed: false,
        description: 'La clause de résiliation anticipée exige un préavis écrit de 60 jours.',
        whyItMatters:
          'Si vous prévoyez de rompre le bail, vous devez donner un préavis avant le 1er octobre pour éviter la pénalité complète de résiliation de $6 760.',
        actionLabel: 'Définir un rappel',
        category: 'lease',
      },
      {
        id: 't9',
        title: 'Première augmentation possible',
        dueLabel: '1 nov.',
        dueColor: 'rgba(255,255,255,0.9)',
        completed: false,
        description:
          'Lors du renouvellement, votre propriétaire peut augmenter le loyer jusqu\'à 8% selon la clause du bail.',
        whyItMatters:
          'Connaître les moments d\'augmentation vous permet de planifier votre budget et de négocier proactivement avant le renouvellement.',
        actionLabel: 'Définir un rappel',
        category: 'lease',
      },
    ],
  },
];
