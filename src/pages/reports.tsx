import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Link from '@docusaurus/Link';

// Report data interface (fallback static data)
interface ReportItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  link: string;
  tags: string[];
  isFeatured?: boolean;
}

// Static fallback data based on existing blog posts
const staticReportsData: ReportItem[] = [
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
    isFeatured: true
  },
  {
    id: '2',
    title: 'Announcing the FemTech Innovation Challenge 2024: Revolutionizing Women\'s Health Through Technology',
    description: 'Are you passionate about creating innovative solutions for women\'s health? Do you believe technology can break barriers and improve care for women?',
    category: 'Competition',
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

const categories = ['All Reports', 'Technology', 'Competition', 'Investment', 'Research'];

// Report card component
function ReportCard({ report }: { report: ReportItem }) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/50 backdrop-blur-sm">
      <Link to={report.link} className="block h-full text-decoration-none">
        <div className="aspect-[16/10] overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/10 to-primary/5">
          {report.image ? (
            <img 
              src={report.image} 
              alt={report.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-2">
                  {report.title.split(' ')[0]}
                </div>
                <div className="text-primary/60 text-sm font-medium">
                  {report.category}
                </div>
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="mb-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {report.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {report.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {report.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>{report.author}</span>
              <span>•</span>
              <span>{report.date}</span>
              <span>•</span>
              <span>{report.readTime}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {report.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

// Featured report component
function FeaturedReport({ report }: { report: ReportItem }) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
      <Link to={report.link} className="block text-decoration-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
            {report.image ? (
              <img 
                src={report.image} 
                alt={report.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/30">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary/40 mb-4">
                    {report.title.split(' ')[0]}
                  </div>
                  <div className="text-primary/70 font-medium">
                    {report.category}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
                Featured Report
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {report.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {report.description}
            </p>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <span className="font-medium">{report.author}</span>
              <span className="mx-2">•</span>
              <span>{report.date}</span>
              <span className="mx-2">•</span>
              <span>{report.readTime}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {report.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default function Reports(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [activeCategory, setActiveCategory] = useState('All Reports');

  // Use static data for now
  const reportsData = staticReportsData;

  // Find featured report
  const featuredReport = reportsData.find(report => report.isFeatured);

  // Filter reports based on active category (exclude featured reports from regular listing)
  const filteredReports = reportsData.filter(report => {
    // Don't show featured reports in regular listing
    if (report.isFeatured) {
      return false;
    }
    
    if (activeCategory === 'All Reports') {
      return true;
    }
    
    return report.category === activeCategory;
  });

  // Sort reports by date (newest first) - simple sort for static data
  const sortedReports = filteredReports.sort((a, b) => 
    new Date('2024-' + b.date.replace(' ', '-')).getTime() - new Date('2024-' + a.date.replace(' ', '-')).getTime()
  );

  return (
    <Layout
      title="Reports"
      description="Latest insights and research on women's health technology and innovation">
      
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-background pt-24 pb-16">
        <div className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[var(--ifm-color-primary)] to-[var(--ifm-color-primary-lightest)] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              The FemTech Reports
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              Latest insights and research on women's health technology, innovation, and market trends
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Categories */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center space-x-1 py-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Featured Report */}
          {featuredReport && activeCategory === 'All Reports' && (
            <div className="mb-16">
              <FeaturedReport report={featuredReport} />
            </div>
          )}

          {/* Reports Section */}
          {sortedReports.length > 0 ? (
            <>
              {/* Latest Reports */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {activeCategory === 'All Reports' ? 'Latest Reports' : `${activeCategory} Reports`}
                </h2>
                <p className="text-muted-foreground">
                  {activeCategory === 'All Reports' 
                    ? 'Stay updated with our comprehensive research and analysis'
                    : `Browse our ${activeCategory.toLowerCase()} reports and insights`
                  }
                </p>
              </div>

              {/* Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No reports found in this category. Check back soon for new content!
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Stay Updated with Our Research
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get the latest reports and insights delivered directly to your inbox. 
                Join our community of women's health innovators and investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/about-us"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 text-decoration-none"
                >
                  Learn More About Us
                </Link>
                <Link 
                  to="mailto:hello@femtechweekend.com"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8 text-decoration-none"
                >
                  Contact Research Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 