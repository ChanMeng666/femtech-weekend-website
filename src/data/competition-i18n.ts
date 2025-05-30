import {translate} from '@docusaurus/Translate';
import { CompetitionCategory, TimelineEvent } from './competition';

// Function to get translated competition categories
export const getCompetitionCategories = (): CompetitionCategory[] => [
  {
    title: translate({
      id: 'competition.categories.reproductiveHealth.title',
      message: 'Reproductive Health',
    }),
    description: translate({
      id: 'competition.categories.reproductiveHealth.description',
      message: 'Fertility tracking, contraception, pregnancy care, menopause management',
    }),
  },
  {
    title: translate({
      id: 'competition.categories.mentalHealth.title',
      message: 'Mental Health & Wellness',
    }),
    description: translate({
      id: 'competition.categories.mentalHealth.description',
      message: 'Postpartum depression, anxiety management, wellness apps, therapy platforms',
    }),
  },
  {
    title: translate({
      id: 'competition.categories.preventiveCare.title',
      message: 'Preventive Care',
    }),
    description: translate({
      id: 'competition.categories.preventiveCare.description',
      message: 'Cancer screening, diagnostic tools, early detection systems, health monitoring',
    }),
  },
  {
    title: translate({
      id: 'competition.categories.chronicDisease.title',
      message: 'Chronic Disease Management',
    }),
    description: translate({
      id: 'competition.categories.chronicDisease.description',
      message: 'PCOS, endometriosis, autoimmune conditions, personalized treatment plans',
    }),
  },
];

// Function to get translated eligibility criteria
export const getEligibilityCriteria = (): string[] => [
  translate({
    id: 'competition.eligibility.earlyStageCriteria',
    message: 'Early-stage startups (pre-Series A)',
  }),
  translate({
    id: 'competition.eligibility.focusCriteria',
    message: 'Focus on women\'s health technology',
  }),
  translate({
    id: 'competition.eligibility.teamSizeCriteria',
    message: 'Team of 2-5 members',
  }),
  translate({
    id: 'competition.eligibility.prototypeCriteria',
    message: 'Working prototype or MVP',
  }),
  translate({
    id: 'competition.eligibility.businessModelCriteria',
    message: 'Clear business model and go-to-market strategy',
  }),
  translate({
    id: 'competition.eligibility.commitmentCriteria',
    message: 'Commitment to participate in full program',
  }),
];

// Function to get translated timeline events
export const getTimelineEvents = (): TimelineEvent[] => [
  {
    date: translate({
      id: 'competition.timeline.event1.date',
      message: 'Until October 20, 2024',
    }),
    title: translate({
      id: 'competition.timeline.event1.title',
      message: 'Registration & Application',
    }),
    description: translate({
      id: 'competition.timeline.event1.description',
      message: 'Submit your application with team details and project pitch',
    }),
    status: 'current'
  },
  {
    date: translate({
      id: 'competition.timeline.event2.date',
      message: 'Nov 1 - Nov 20',
    }),
    title: translate({
      id: 'competition.timeline.event2.title',
      message: 'Initial Screening',
    }),
    description: translate({
      id: 'competition.timeline.event2.description',
      message: 'Expert panel reviews applications and selects semifinalists',
    }),
    status: 'upcoming'
  },
  {
    date: translate({
      id: 'competition.timeline.event3.date',
      message: 'Nov 23 - Nov 29',
    }),
    title: translate({
      id: 'competition.timeline.event3.title',
      message: 'Mentorship Phase',
    }),
    description: translate({
      id: 'competition.timeline.event3.description',
      message: 'Selected teams receive mentorship and refine their solutions',
    }),
    status: 'upcoming'
  },
  {
    date: translate({
      id: 'competition.timeline.event4.date',
      message: 'Nov 30 - Dec 1',
    }),
    title: translate({
      id: 'competition.timeline.event4.title',
      message: 'Final Pitch Weekend',
    }),
    description: translate({
      id: 'competition.timeline.event4.description',
      message: 'Teams present to judges and investors at the main event',
    }),
    status: 'upcoming'
  },
  {
    date: translate({
      id: 'competition.timeline.event5.date',
      message: 'Dec 1',
    }),
    title: translate({
      id: 'competition.timeline.event5.title',
      message: 'Awards Ceremony',
    }),
    description: translate({
      id: 'competition.timeline.event5.description',
      message: 'Winners announced and networking celebration',
    }),
    status: 'upcoming'
  }
]; 