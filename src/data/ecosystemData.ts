import { EcosystemMember, StatItem } from '../types/ecosystem';
import {
  getCommunityMembersText,
  getMemberCategoriesText,
  getCountriesRepresentedText,
  getPartnerOrganizationsText
} from '../constants/ecosystem-components';

export const ecosystemMembers: EcosystemMember[] = [
  // FemTech founders (Mainland China)
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Founder & CEO',
    company: 'WomenTech Solutions',
    bio: 'Pioneer in AI-powered fertility tracking solutions, helping millions of women understand their reproductive health.',
    category: 'FemTech founders (Mainland China)',
    location: 'Shanghai, China',
    expertise: ['AI/ML', 'Reproductive Health', 'Product Development'],
    achievements: 'Raised $5M Series A, 500K+ users'
  },
  {
    id: '2',
    name: 'Li Wei',
    role: 'Co-founder',
    company: 'HealthHer Tech',
    bio: 'Building comprehensive women\'s health platforms with focus on mental health and wellness.',
    category: 'FemTech founders (Mainland China)',
    location: 'Beijing, China',
    expertise: ['Mental Health', 'Platform Development', 'User Experience'],
    achievements: 'Winner FemTech Innovation Award 2023'
  },
  
  // FemTech founders (International)
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Founder',
    company: 'Global Women\'s Health',
    bio: 'International healthcare entrepreneur focused on accessible women\'s health solutions across emerging markets.',
    category: 'FemTech founders (International)',
    location: 'San Francisco, USA',
    expertise: ['Global Health', 'Market Expansion', 'Healthcare Access'],
    achievements: 'Expanded to 15 countries'
  },
  {
    id: '4',
    name: 'Dr. Priya Patel',
    role: 'CEO & Founder',
    company: 'MedTech Innovations',
    bio: 'Developing breakthrough medical devices for women\'s reproductive health with cutting-edge technology.',
    category: 'FemTech founders (International)',
    location: 'London, UK',
    expertise: ['Medical Devices', 'Regulatory Affairs', 'Clinical Research'],
    achievements: 'FDA Approved Device, $3M Grant'
  },
  
  // Investors
  {
    id: '5',
    name: 'Michael Zhang',
    role: 'Partner',
    company: 'Future Health Ventures',
    bio: 'Leading healthcare investor with deep expertise in women\'s health and digital therapeutics.',
    category: 'Investors',
    location: 'Hong Kong',
    expertise: ['Healthcare Investment', 'Digital Health', 'Market Analysis'],
    achievements: '$100M+ invested in FemTech'
  },
  {
    id: '6',
    name: 'Jennifer Liu',
    role: 'Investment Director',
    company: 'Innovation Capital',
    bio: 'Focused on early-stage FemTech investments and supporting women entrepreneurs in healthcare.',
    category: 'Investors',
    location: 'Singapore',
    expertise: ['Venture Capital', 'Due Diligence', 'Startup Mentoring'],
    achievements: '20+ FemTech portfolio companies'
  },
  
  // Corporates
  {
    id: '7',
    name: 'David Wang',
    role: 'Head of Innovation',
    company: 'HealthCorp Asia',
    bio: 'Leading corporate innovation initiatives in women\'s health and strategic partnerships.',
    category: 'Corporates',
    location: 'Shanghai, China',
    expertise: ['Corporate Strategy', 'Innovation Management', 'Partnerships'],
    achievements: 'Launched 5 FemTech partnerships'
  },
  {
    id: '8',
    name: 'Rachel Kim',
    role: 'VP Strategic Partnerships',
    company: 'MedDevice Global',
    bio: 'Driving corporate engagement with FemTech startups and developing new market opportunities.',
    category: 'Corporates',
    location: 'Seoul, South Korea',
    expertise: ['Business Development', 'Market Entry', 'Product Strategy'],
    achievements: '$50M+ partnership deals'
  },
  
  // Academia
  {
    id: '9',
    name: 'Prof. Dr. Maria Zhang',
    role: 'Professor of Gynecology',
    company: 'Tsinghua University',
    bio: 'Renowned researcher in women\'s reproductive health with focus on technology integration in clinical practice.',
    category: 'Academia',
    location: 'Beijing, China',
    expertise: ['Clinical Research', 'Women\'s Health', 'Medical Technology'],
    achievements: '100+ peer-reviewed publications'
  },
  {
    id: '10',
    name: 'Dr. James Liu',
    role: 'Research Director',
    company: 'Shanghai Medical Institute',
    bio: 'Leading research in digital health applications for women\'s healthcare and preventive medicine.',
    category: 'Academia',
    location: 'Shanghai, China',
    expertise: ['Digital Health Research', 'Preventive Medicine', 'Data Science'],
    achievements: 'NIH Grant Recipient, 50+ Studies'
  },
  
  // FemTech enthusiasts
  {
    id: '11',
    name: 'Anna Chen',
    role: 'Community Manager',
    company: 'Women in Tech Asia',
    bio: 'Passionate advocate for women\'s health innovation and building inclusive communities in technology.',
    category: 'FemTech enthusiasts',
    location: 'Shenzhen, China',
    expertise: ['Community Building', 'Event Management', 'Advocacy'],
    achievements: 'Built 5000+ member community'
  },
  {
    id: '12',
    name: 'Sophie Williams',
    role: 'Product Manager',
    company: 'TechForGood',
    bio: 'Technology enthusiast dedicated to leveraging innovation for social impact in women\'s health.',
    category: 'FemTech enthusiasts',
    location: 'Melbourne, Australia',
    expertise: ['Product Management', 'Social Impact', 'UX Design'],
    achievements: 'Launched 3 health-focused products'
  }
];

export const categories = [
  'All Members',
  'FemTech founders (Mainland China)',
  'FemTech founders (International)',
  'Investors',
  'Corporates',
  'Academia',
  'FemTech enthusiasts'
];

// Function to get ecosystem stats with translations
export const getEcosystemStats = (): StatItem[] => [
  { value: '200+', label: getCommunityMembersText() },
  { value: '6', label: getMemberCategoriesText() },
  { value: '15+', label: getCountriesRepresentedText() },
  { value: '50+', label: getPartnerOrganizationsText() },
];

// Legacy static version (keeping for reference)
export const ecosystemStats: StatItem[] = [
  { value: '200+', label: 'Community Members' },
  { value: '6', label: 'Member Categories' },
  { value: '15+', label: 'Countries Represented' },
  { value: '50+', label: 'Partner Organizations' },
]; 