import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Import types
import { ReportCategory } from '../../../src/types/reports';

// Import data and utility functions
import { 
  getReportsData, 
  getFeaturedReport, 
  filterReportsByCategory, 
  sortReportsByDate 
} from '../../../src/data/reports';
import { getReportsTitle, getReportsDescription } from '../../../src/constants/reports';

// Import components
import {
  ReportCard,
  FeaturedReport,
  ReportsHero,
  ReportsNavigation,
  ReportsCTA
} from '../../../src/components/Reports';
import { LogoDivider } from '../../../src/components/ui/LogoDivider';

export default function Reports(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [activeCategory, setActiveCategory] = useState<ReportCategory>('All Reports');

  // Get data using utility functions
  const reportsData = getReportsData();
  const featuredReport = getFeaturedReport();
  
  // Filter and sort reports
  const filteredReports = filterReportsByCategory(reportsData, activeCategory);
  const sortedReports = sortReportsByDate(filteredReports);

  const title = getReportsTitle();
  const description = getReportsDescription();

  const handleCategoryChange = (category: ReportCategory) => {
    setActiveCategory(category);
  };

  return (
    <Layout
      title={title}
      description={description}>
      
      {/* Hero Section */}
      <ReportsHero />

      {/* Navigation Categories */}
      <ReportsNavigation 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Content */}
      <div className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Featured Report */}
          {featuredReport && activeCategory === 'All Reports' && (
            <div className="mb-16">
              <FeaturedReport report={featuredReport} />
              <LogoDivider className="mt-16" />
            </div>
          )}

          {/* Reports Section */}
          {sortedReports.length > 0 ? (
            <>
              {/* Temporarily commented out Latest Reports section
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {activeCategory === 'All Reports' ? '最新报告' : `${activeCategory} 报告`}
                </h2>
                <p className="text-muted-foreground">
                  {activeCategory === 'All Reports' 
                    ? '通过我们全面的研究和分析保持最新动态'
                    : `浏览我们的${activeCategory.toLowerCase()}报告和洞察`
                  }
                </p>
              </div>
              */}

              {/* Temporarily commented out Reports Grid 
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
              */}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                该类别中没有找到报告。请稍后再查看新内容！
              </p>
            </div>
          )}

          {/* CTA Section */}
          <ReportsCTA />
        </div>
      </div>
    </Layout>
  );
} 