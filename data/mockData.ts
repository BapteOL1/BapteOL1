export const neighborhoodData = [
  {
    id: '1',
    name: "Hell's Kitchen",
    borough: 'Manhattan',
    avgRent: '$2,800/mo',
    commute: '12 min',
    score: 8.7,
    scoreColor: '#4caf8a',
    tags: ['Safe', 'Good transit', 'Young professionals'],
  },
  {
    id: '2',
    name: 'Astoria',
    borough: 'Queens',
    avgRent: '$2,200/mo',
    commute: '28 min',
    score: 8.2,
    scoreColor: '#c8a97a',
    tags: ['Diverse', 'Affordable', 'Food scene'],
  },
  {
    id: '3',
    name: 'Jersey City',
    borough: 'New Jersey',
    avgRent: '$2,400/mo',
    commute: '22 min',
    score: 7.9,
    scoreColor: '#c8a97a',
    tags: ['Waterfront', 'Growing', 'PATH access'],
  },
  {
    id: '4',
    name: 'Long Island City',
    borough: 'Queens',
    avgRent: '$2,600/mo',
    commute: '18 min',
    score: 8.1,
    scoreColor: '#c8a97a',
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
  { id: 'm2', label: 'Internet', amount: 80, color: '#6a8ac8', barWidth: 0.024 },
  { id: 'm3', label: 'MTA Pass', amount: 134, color: '#9a7ac8', barWidth: 0.04 },
  { id: 'm4', label: 'Electricity', amount: 0, color: '#e85454', barWidth: 0, warning: true },
  { id: 'm5', label: 'Renters Insurance', amount: 15, color: '#4caf8a', barWidth: 0.004 },
];

export const upfrontExpenses: Expense[] = [
  { id: 'u1', label: 'First month rent', amount: 3380, color: '#c8a97a', barWidth: 0.4 },
  { id: 'u2', label: 'Security deposit', amount: 3380, color: '#9a7ac8', barWidth: 0.4 },
  { id: 'u3', label: 'Moving company', amount: 1200, color: '#6a8ac8', barWidth: 0.142 },
  { id: 'u4', label: 'Building fee', amount: 350, color: '#e8954a', barWidth: 0.041 },
  { id: 'u5', label: 'Utility deposit', amount: 150, color: '#4caf8a', barWidth: 0.018 },
];

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
}

export interface TaskGroup {
  id: string;
  title: string;
  tasks: Task[];
}

export const initialTimelineGroups: TaskGroup[] = [
  {
    id: 'this-week',
    title: 'This week',
    tasks: [
      {
        id: 't1',
        title: 'Activate Con Edison',
        dueLabel: 'DUE TODAY',
        dueColor: '#e85454',
        dueBg: '#2e1414',
        completed: false,
        description: 'Activate your Con Edison electricity account for 350 W 42nd St, Apt 12B.',
        whyItMatters:
          'Without activation, you will have no electricity on move-in day (April 1). Con Edison requires 3–5 business days to process new accounts.',
        actionLabel: 'Activate Now',
      },
      {
        id: 't2',
        title: 'Reserve building elevator',
        dueLabel: 'Due Apr 28',
        dueColor: '#e4e2dc',
        completed: false,
        description: 'Contact building management to reserve the freight elevator for move day.',
        whyItMatters:
          'Most Manhattan buildings require advance elevator booking. Moving without a reservation can cause delays and extra fees.',
        actionLabel: 'Contact Building',
      },
      {
        id: 't3',
        title: 'Sign lease',
        dueLabel: 'Completed',
        dueColor: '#4caf8a',
        dueBg: '#122a1e',
        completed: true,
        description: 'Sign your lease agreement for 350 W 42nd St.',
        whyItMatters: 'Your lease is signed and your tenancy is legally established.',
        actionLabel: 'View Lease',
      },
    ],
  },
  {
    id: 'next-week',
    title: 'Next week',
    tasks: [
      {
        id: 't4',
        title: 'Set up internet (Verizon Fios)',
        dueLabel: 'Due Apr 30',
        dueColor: '#e4e2dc',
        completed: false,
        description: 'Schedule Verizon Fios installation for your new apartment.',
        whyItMatters:
          'Fios installation requires an in-person technician visit. Book early to get your preferred time slot — slots fill up fast in Hell\'s Kitchen.',
        actionLabel: 'Schedule Installation',
      },
      {
        id: 't5',
        title: 'Get renters insurance',
        dueLabel: 'Due May 1',
        dueColor: '#e4e2dc',
        completed: false,
        description: 'Purchase renters insurance before your move-in date.',
        whyItMatters:
          'Your lease requires proof of renters insurance. Lemonade offers plans from $5/mo with same-day coverage.',
        actionLabel: 'Get Quote',
      },
      {
        id: 't6',
        title: 'Book movers (FlatRate)',
        dueLabel: 'Completed',
        dueColor: '#4caf8a',
        dueBg: '#122a1e',
        completed: true,
        description: 'FlatRate Moving booked for April 1, 9:00 AM.',
        whyItMatters: 'Your movers are confirmed. Confirmation #FR-29841.',
        actionLabel: 'View Confirmation',
      },
    ],
  },
  {
    id: 'after-move',
    title: 'After move-in',
    tasks: [
      {
        id: 't7',
        title: 'Lease renewal window opens',
        dueLabel: 'Oct 1',
        dueColor: '#e4e2dc',
        completed: false,
        description:
          'Your landlord must provide renewal terms 90–150 days before lease end.',
        whyItMatters:
          'NYC law requires landlords to offer renewals with advance notice. Use this window to negotiate rent before agreeing.',
        actionLabel: 'Set Reminder',
      },
      {
        id: 't8',
        title: 'ETF window closes',
        dueLabel: 'Oct 1',
        dueColor: '#e4e2dc',
        completed: false,
        description: 'Your early termination fee clause requires 60 days written notice.',
        whyItMatters:
          'If you plan to break the lease, you must give notice by Oct 1 to avoid the full $6,760 early termination fee.',
        actionLabel: 'Set Reminder',
      },
      {
        id: 't9',
        title: 'First rent increase possible',
        dueLabel: 'Nov 1',
        dueColor: '#e4e2dc',
        completed: false,
        description:
          'At renewal, your landlord may increase rent up to 8% per the lease clause.',
        whyItMatters:
          'Knowing when increases can happen lets you plan your budget and negotiate proactively before renewal.',
        actionLabel: 'Set Reminder',
      },
    ],
  },
];
