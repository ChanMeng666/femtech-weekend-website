import { ReportItem } from '../types/reports';

// Static fallback data based on existing blog posts
export const staticReportsData: ReportItem[] = [
  {
    id: '5',
    title: 'FemTech Market Map 2025: Comprehensive Analysis of Women\'s Health Innovation in Mainland China and Hong Kong',
    description: 'The FemTech market in Greater China is experiencing unprecedented growth, entering a phase of rapid expansion supported by favorable developments across policy, economic, social, and technological fronts.',
    category: 'Research',
    date: 'May 30',
    readTime: '10 min read',
    author: 'Zhu Yihan & Maaike Steinebach',
    image: '/img/reports/FemTech-Map-in-Greater-China-report-cover.svg',
    link: '/blog/femtech-market-map-greater-china-2025',
    tags: ['Research', 'Market Analysis', 'China', 'Hong Kong'],
    isFeatured: true
  },
  {
    id: '1',
    title: 'Join the FemTech Hackathon 2024: Building the Future of Women\'s Health Tech in 48 Hours',
    description: 'Get ready for the most exciting women\'s health tech event of the year! FemTech Weekend is thrilled to announce our 2024 FemTech Hackathon - a 48-hour innovation sprint.',
    category: 'Technology',
    date: 'Jul 1',
    readTime: '5 min read',
    author: 'Chan Meng',
    image: '/img/femtech-weekend-social-card.png',
    link: '/blog/femtech-hackathon-2024',
    tags: ['Hackathon', 'Technology', 'Innovation'],
    isFeatured: false
  },
  {
    id: '2',
    title: 'Announcing the FemTech Innovation Challenge 2024: Revolutionizing Women\'s Health Through Technology',
    description: 'Are you passionate about creating innovative solutions for women\'s health? Do you believe technology can break barriers and improve care for women?',
    category: 'General',
    date: 'Jun 15',
    readTime: '4 min read',
    author: 'Chan Meng',
    image: '/img/femtech-weekend-social-card.png',
    link: '/blog/femtech-innovation-challenge-2024',
    tags: ['Competition', 'Innovation', 'Women\'s Health']
  },
  {
    id: '3',
    title: 'FemTech Startup Pitch Competition: Your Gateway to Global Investors',
    description: 'Are you building an innovative solution in the women\'s health technology space? FemTech Weekend is excited to announce our inaugural FemTech Startup Pitch Competition.',
    category: 'Investment',
    date: 'Jul 20',
    readTime: '6 min read',
    author: 'Chan Meng',
    image: '/img/femtech-weekend-social-card.png',
    link: '/blog/femtech-startup-pitch-competition',
    tags: ['Startup', 'Investment', 'Competition']
  },
  {
    id: '4',
    title: 'FemTech Research Symposium 2024: Bridging Science and Innovation in Women\'s Health',
    description: 'FemTech Weekend is proud to announce our first FemTech Research Symposium, a landmark event bringing together leading researchers, clinicians, technologists, and entrepreneurs.',
    category: 'Research',
    date: 'Aug 5',
    readTime: '7 min read',
    author: 'Chan Meng',
    image: '/img/femtech-weekend-social-card.png',
    link: '/blog/femtech-research-symposium-2024',
    tags: ['Research', 'Innovation', 'Women\'s Health']
  }
];

// Function to get reports data (can be extended to fetch from API)
export const getReportsData = (): ReportItem[] => {
  return staticReportsData;
};

// Function to get featured report
export const getFeaturedReport = (): ReportItem | undefined => {
  return staticReportsData.find(report => report.isFeatured);
};

// Function to filter reports by category
export const filterReportsByCategory = (reports: ReportItem[], category: string): ReportItem[] => {
  if (category === 'All Reports') {
    // Return all reports including featured ones
    return reports;
  }
  
  return reports.filter(report => {
    return report.category === category;
  });
};

// Function to sort reports by date (newest first)
export const sortReportsByDate = (reports: ReportItem[]): ReportItem[] => {
  return reports.sort((a, b) => 
    new Date('2024-' + b.date.replace(' ', '-')).getTime() - 
    new Date('2024-' + a.date.replace(' ', '-')).getTime()
  );
}; 