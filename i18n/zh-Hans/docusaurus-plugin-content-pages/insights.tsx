import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Import types
import { InsightCategory } from '../../../src/types/insights';

// Import data and utility functions
import {
  getInsightsData,
  getFeaturedInsight,
  filterInsightsByCategory,
  sortInsightsByDate
} from '../../../src/data/insights';
import { getInsightsTitle, getInsightsDescription, INSIGHT_CATEGORY_KEYS, getTranslatedCategory } from '../../../src/constants/insights';

// Import components
import {
  InsightCard,
  FeaturedInsight,
  InsightsHero,
  InsightsNavigation,
  InsightsCTA
} from '../../../src/components/Insights';
import { LogoDivider } from '../../../src/components/ui/LogoDivider';
import { translateInsightField } from '../../../src/constants/insights-components';

export default function Insights(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [activeCategory, setActiveCategory] = useState<InsightCategory>(INSIGHT_CATEGORY_KEYS.ALL_INSIGHTS);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get data using utility functions
  const insightsData = getInsightsData();
  const featuredInsight = getFeaturedInsight();

  // Handle tag click
  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    // Reset category when filtering by tag
    setActiveCategory(INSIGHT_CATEGORY_KEYS.ALL_INSIGHTS);
  };

  // Filter by category first
  const filteredByCategory = filterInsightsByCategory(insightsData, activeCategory);

  // Then filter by tag if one is selected
  const filteredInsights = activeTag
    ? filteredByCategory.filter(insight => {
        // First, check direct match in tags array
        if (insight.tags.includes(activeTag)) {
          return true;
        }

        // Then, check for match across different translations of the same tag
        return insight.tags.some(tag => {
          // Compare with other insights that have this tag
          return insightsData.some(otherInsight =>
            otherInsight.tags.includes(activeTag) && otherInsight.tags.includes(tag)
          );
        });
      })
    : filteredByCategory;

  // Sort the filtered insights
  const sortedInsights = sortInsightsByDate(filteredInsights);

  const title = getInsightsTitle();
  const description = getInsightsDescription();

  const handleCategoryChange = (category: InsightCategory) => {
    setActiveCategory(category);
    // Reset tag filter when changing category
    setActiveTag(null);
  };

  // Translate "No insights found" message
  const noInsightsMessage = translateInsightField(
    'insights.noInsightsFound',
    'No insights found in this category. Check back soon for new content!'
  );

  // Get tag results title
  const getTagResultsTitle = () => {
    if (activeTag) {
      const tagPrefix = translateInsightField('insights.tagResultsPrefix', 'Results for tag:');
      return `${tagPrefix} ${activeTag}`;
    }
    return '';
  };

  return (
    <Layout
      title={title}
      description={description}>

      {/* Hero Section */}
      <InsightsHero />

      {/* Navigation Categories */}
      <InsightsNavigation
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
                {translateInsightField('insights.filteringByTag', 'Filtering by tag:')}
              </div>
              <div className="flex items-center bg-primary/10 rounded-full px-4 py-2">
                <span className="font-medium text-primary mr-2">{activeTag}</span>
                <button
                  onClick={() => setActiveTag(null)}
                  className="text-primary hover:text-primary/70 transition-colors"
                  aria-label={translateInsightField('insights.clearFilter', 'Clear filter')}
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Featured Insight - only show if no tag filter is active */}
          {featuredInsight && activeCategory === INSIGHT_CATEGORY_KEYS.ALL_INSIGHTS && !activeTag && (
            <div className="mb-16">
              <FeaturedInsight
                insight={featuredInsight}
                onTagClick={handleTagClick}
              />
              <LogoDivider className="mt-16" />
            </div>
          )}

          {/* Insights Section */}
          {sortedInsights.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {activeTag
                    ? getTagResultsTitle()
                    : activeCategory === INSIGHT_CATEGORY_KEYS.ALL_INSIGHTS
                      ? translateInsightField('insights.section.title', 'Latest Insights')
                      : `${getTranslatedCategory(activeCategory)} ${translateInsightField('insights.categoryInsightsSuffix', 'Insights')}`
                  }
                </h2>
                <p className="text-muted-foreground">
                  {activeTag
                    ? translateInsightField(
                        'insights.showingTagResults',
                        'Showing all insights with the selected tag'
                      )
                    : activeCategory === INSIGHT_CATEGORY_KEYS.ALL_INSIGHTS
                      ? translateInsightField(
                          'insights.section.subtitle',
                          'Stay updated with our comprehensive research and analysis'
                        )
                      : `${translateInsightField('insights.browsePrefix', 'Browse our')} ${getTranslatedCategory(activeCategory).toLowerCase()} ${translateInsightField('insights.browseSuffix', 'insights and analysis')}`
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedInsights
                  .filter(insight => !insight.isFeatured || activeCategory !== INSIGHT_CATEGORY_KEYS.ALL_INSIGHTS || activeTag)
                  .map((insight) => (
                    <InsightCard
                      key={insight.id}
                      insight={insight}
                      onTagClick={handleTagClick}
                    />
                  ))
                }
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                {noInsightsMessage}
              </p>
            </div>
          )}

          {/* CTA Section */}
          <InsightsCTA />
        </div>
      </div>
    </Layout>
  );
}
