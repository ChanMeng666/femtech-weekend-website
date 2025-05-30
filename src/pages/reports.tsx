import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Import types
import { ReportCategory } from '../types/reports';

// Import data and utility functions
import { 
  getReportsData, 
  getFeaturedReport, 
  filterReportsByCategory, 
  sortReportsByDate 
} from '../data/reports';
import { getReportsTitle, getReportsDescription, REPORT_CATEGORY_KEYS, getTranslatedCategory } from '../constants/reports';

// Import components
import {
  ReportCard,
  FeaturedReport,
  ReportsHero,
  ReportsNavigation,
  ReportsCTA
} from '../components/Reports';
import { LogoDivider } from '../components/ui/LogoDivider';
import { translateReportField } from '../constants/reports-components';

export default function Reports(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [activeCategory, setActiveCategory] = useState<ReportCategory>(REPORT_CATEGORY_KEYS.ALL_REPORTS);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get data using utility functions
  const reportsData = getReportsData();
  const featuredReport = getFeaturedReport();
  
  // Handle tag click
  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    // Reset category when filtering by tag
    setActiveCategory(REPORT_CATEGORY_KEYS.ALL_REPORTS);
  };

  // Filter by category first
  const filteredByCategory = filterReportsByCategory(reportsData, activeCategory);
  
  // Then filter by tag if one is selected
  const filteredReports = activeTag 
    ? filteredByCategory.filter(report => {
        // First, check direct match in tags array
        if (report.tags.includes(activeTag)) {
          return true;
        }
        
        // Then, check for match across different translations of the same tag
        return report.tags.some(tag => {
          // Compare with other reports that have this tag
          return reportsData.some(otherReport => 
            otherReport.tags.includes(activeTag) && otherReport.tags.includes(tag)
          );
        });
      })
    : filteredByCategory;
  
  // Sort the filtered reports
  const sortedReports = sortReportsByDate(filteredReports);

  const title = getReportsTitle();
  const description = getReportsDescription();

  const handleCategoryChange = (category: ReportCategory) => {
    setActiveCategory(category);
    // Reset tag filter when changing category
    setActiveTag(null);
  };

  // Translate "No reports found" message
  const noReportsMessage = translateReportField(
    'reports.noReportsFound',
    'No reports found in this category. Check back soon for new content!'
  );

  // Get tag results title
  const getTagResultsTitle = () => {
    if (activeTag) {
      const tagPrefix = translateReportField('reports.tagResultsPrefix', 'Results for tag:');
      return `${tagPrefix} ${activeTag}`;
    }
    return '';
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
          
          {/* Active Tag Display */}
          {activeTag && (
            <div className="mb-8 flex items-center">
              <div className="mr-2 text-muted-foreground">
                {translateReportField('reports.filteringByTag', 'Filtering by tag:')}
              </div>
              <div className="flex items-center bg-primary/10 rounded-full px-4 py-2">
                <span className="font-medium text-primary mr-2">{activeTag}</span>
                <button 
                  onClick={() => setActiveTag(null)}
                  className="text-primary hover:text-primary/70 transition-colors"
                  aria-label={translateReportField('reports.clearFilter', 'Clear filter')}
                >
                  ×
                </button>
              </div>
            </div>
          )}
          
          {/* Featured Report - only show if no tag filter is active */}
          {featuredReport && activeCategory === REPORT_CATEGORY_KEYS.ALL_REPORTS && !activeTag && (
            <div className="mb-16">
              <FeaturedReport 
                report={featuredReport} 
                onTagClick={handleTagClick}
              />
              <LogoDivider className="mt-16" />
            </div>
          )}

          {/* Reports Section */}
          {sortedReports.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {activeTag 
                    ? getTagResultsTitle()
                    : activeCategory === REPORT_CATEGORY_KEYS.ALL_REPORTS 
                      ? translateReportField('reports.section.title', 'Latest Reports')
                      : `${getTranslatedCategory(activeCategory)} ${translateReportField('reports.categoryReportsSuffix', 'Reports')}`
                  }
                </h2>
                <p className="text-muted-foreground">
                  {activeTag
                    ? translateReportField(
                        'reports.showingTagResults', 
                        'Showing all reports with the selected tag'
                      )
                    : activeCategory === REPORT_CATEGORY_KEYS.ALL_REPORTS 
                      ? translateReportField(
                          'reports.section.subtitle',
                          'Stay updated with our comprehensive research and analysis'
                        )
                      : `${translateReportField('reports.browsePrefix', 'Browse our')} ${getTranslatedCategory(activeCategory).toLowerCase()} ${translateReportField('reports.browseSuffix', 'reports and insights')}`
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedReports
                  .filter(report => !report.isFeatured || activeCategory !== REPORT_CATEGORY_KEYS.ALL_REPORTS || activeTag)
                  .map((report) => (
                    <ReportCard 
                      key={report.id} 
                      report={report}
                      onTagClick={handleTagClick}
                    />
                  ))
                }
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                {noReportsMessage}
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