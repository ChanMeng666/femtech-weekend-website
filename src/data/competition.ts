// Competition data and configuration
import {
  getParticipatingTeamsText,
  getTotalPrizePoolText,
  getIndustryMentorsText,
  getInvestmentPartnersText
} from '../constants/competition-components';

export interface CompetitionStat {
  value: string;
  label: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'current' | 'upcoming' | 'completed';
}

export interface Prize {
  title: string;
  amount: string;
  benefits: string[];
  highlight?: boolean;
}

export interface CompetitionCategory {
  title: string;
  description: string;
}

// Function to get competition stats with translations
export const getCompetitionStats = (): CompetitionStat[] => [
  { value: '50+', label: getParticipatingTeamsText() },
  { value: '¥500K', label: getTotalPrizePoolText() },
  { value: '30+', label: getIndustryMentorsText() },
  { value: '20+', label: getInvestmentPartnersText() },
];

// Legacy static version (keeping for reference)
export const competitionStats: CompetitionStat[] = [
  { value: '50+', label: 'Participating Teams' },
  { value: '¥500K', label: 'Total Prize Pool' },
  { value: '30+', label: 'Industry Mentors' },
  { value: '20+', label: 'Investment Partners' },
];

// Timeline events
export const timelineEvents: TimelineEvent[] = [
  {
    date: 'Jan 15 - Feb 28',
    title: 'Registration & Application',
    description: 'Submit your application with team details and project pitch',
    status: 'current'
  },
  {
    date: 'Mar 1 - Mar 15',
    title: 'Initial Screening',
    description: 'Expert panel reviews applications and selects semifinalists',
    status: 'upcoming'
  },
  {
    date: 'Mar 20 - Apr 15',
    title: 'Mentorship Phase',
    description: 'Selected teams receive mentorship and refine their solutions',
    status: 'upcoming'
  },
  {
    date: 'Apr 20 - Apr 21',
    title: 'Final Pitch Weekend',
    description: 'Teams present to judges and investors at the main event',
    status: 'upcoming'
  },
  {
    date: 'Apr 21',
    title: 'Awards Ceremony',
    description: 'Winners announced and networking celebration',
    status: 'upcoming'
  }
];

// Prize information
export const prizes: Prize[] = [
  {
    title: 'Grand Prize',
    amount: '¥200,000',
    benefits: [
      'Cash prize of ¥200,000',
      'Incubation program placement',
      'Investor introductions',
      'Mentorship for 6 months'
    ],
    highlight: true
  },
  {
    title: '2nd Place',
    amount: '¥100,000',
    benefits: [
      'Cash prize of ¥100,000',
      'Accelerator program access',
      'Networking opportunities',
      'Mentorship for 3 months'
    ]
  },
  {
    title: '3rd Place',
    amount: '¥50,000',
    benefits: [
      'Cash prize of ¥50,000',
      'Industry connections',
      'Marketing support',
      'Mentorship for 1 month'
    ]
  }
];

// Special awards
export const specialAwards: string[] = [
  'Most Innovative Technology Award (¥25,000)',
  'Best Social Impact Award (¥25,000)',
  'People\'s Choice Award (¥25,000)',
  'Best Presentation Award (¥25,000)'
];

// Competition categories
export const competitionCategories: CompetitionCategory[] = [
  {
    title: 'Reproductive Health',
    description: 'Fertility tracking, contraception, pregnancy care, menopause management'
  },
  {
    title: 'Mental Health & Wellness',
    description: 'Postpartum depression, anxiety management, wellness apps, therapy platforms'
  },
  {
    title: 'Preventive Care',
    description: 'Cancer screening, diagnostic tools, early detection systems, health monitoring'
  },
  {
    title: 'Chronic Disease Management',
    description: 'PCOS, endometriosis, autoimmune conditions, personalized treatment plans'
  }
];

// Eligibility criteria
export const eligibilityCriteria: string[] = [
  'Early-stage startups (pre-Series A)',
  'Focus on women\'s health technology',
  'Team of 2-5 members',
  'Working prototype or MVP',
  'Clear business model and go-to-market strategy',
  'Commitment to participate in full program'
]; 