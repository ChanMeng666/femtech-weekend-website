import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Import types
import { OpinionCategory } from '../types/opinions';

// Import data and utility functions
import {
  getOpinionsData,
  getFeaturedOpinion,
  filterOpinionsByCategory,
  sortOpinionsByDate
} from '../data/opinions';
import { getOpinionsTitle, getOpinionsDescription, OPINION_CATEGORY_KEYS, getTranslatedCategory } from '../constants/opinions';

// Import components
import {
  OpinionCard,
  FeaturedOpinion,
  OpinionsHero,
  OpinionsNavigation,
  OpinionsCTA
} from '../components/Opinions';
import { GEOHead, GEOTracker } from '../components';
import { translateOpinionField } from '../constants/opinions-components';

export default function Opinions(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [activeCategory, setActiveCategory] = useState<OpinionCategory>(OPINION_CATEGORY_KEYS.ALL_OPINIONS);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get data using utility functions
  const opinionsData = getOpinionsData();
  const featuredOpinion = getFeaturedOpinion();

  // Handle tag click
  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    // Reset category when filtering by tag
    setActiveCategory(OPINION_CATEGORY_KEYS.ALL_OPINIONS);
  };

  // Filter by category first
  const filteredByCategory = filterOpinionsByCategory(opinionsData, activeCategory);

  // Then filter by tag if one is selected
  const filteredOpinions = activeTag
    ? filteredByCategory.filter(opinion => {
        // First, check direct match in tags array
        if (opinion.tags.includes(activeTag)) {
          return true;
        }

        // Then, check for match across different translations of the same tag
        return opinion.tags.some(tag => {
          // Compare with other opinions that have this tag
          return opinionsData.some(otherOpinion =>
            otherOpinion.tags.includes(activeTag) && otherOpinion.tags.includes(tag)
          );
        });
      })
    : filteredByCategory;

  // Sort the filtered opinions
  const sortedOpinions = sortOpinionsByDate(filteredOpinions);

  const title = getOpinionsTitle();
  const description = getOpinionsDescription();

  const handleCategoryChange = (category: OpinionCategory) => {
    setActiveCategory(category);
    // Reset tag filter when changing category
    setActiveTag(null);
  };

  // Translate "No opinions found" message
  const noOpinionsMessage = translateOpinionField(
    'opinions.noOpinionsFound',
    'No opinions found in this category. Check back soon for new content!'
  );

  // Get tag results title
  const getTagResultsTitle = () => {
    if (activeTag) {
      const tagPrefix = translateOpinionField('opinions.tagResultsPrefix', 'Results for tag:');
      return `${tagPrefix} ${activeTag}`;
    }
    return '';
  };

  return (
    <>
      <GEOHead
        pageType="opinions"
        title={title}
        description={description}
        keywords={[
          'FemTech opinions', 'women health analysis', 'industry commentary',
          'market trends', 'technology perspectives', 'healthcare policy',
          'thought leadership', 'investment insights', 'FemTech analysis',
          'women health trends', 'healthcare innovation', 'industry perspectives'
        ]}
        additionalInstructions="This page features short articles, essays, and opinion pieces on women's health technology, market trends, and industry perspectives."
        language="en"
      />
      <Layout
        title={title}
        description={description}>

        <GEOTracker
          pageType="opinions"
          additionalMetrics={{
            opinionCount: opinionsData.length,
            featuredOpinion: featuredOpinion ? 1 : 0,
            categories: Object.keys(OPINION_CATEGORY_KEYS).length,
            activeFilter: activeCategory
          }}
        />

        {/* Hero Section */}
        <OpinionsHero />

      {/* Navigation Categories */}
      <OpinionsNavigation
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Content */}
      <div className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Active Tag Display */}
          {activeTag && (
            <div className="mb-8 flex items-center">
              <div className="mr-3 mckinsey-label text-muted-foreground">
                {translateOpinionField('opinions.filteringByTag', 'Filtering by tag:')}
              </div>
              <div className="flex items-center border border-primary/30 px-4 py-2">
                <span className="mckinsey-label text-primary mr-3">{activeTag}</span>
                <button
                  onClick={() => setActiveTag(null)}
                  className="text-primary hover:text-primary/70 transition-colors text-lg leading-none"
                  aria-label={translateOpinionField('opinions.clearFilter', 'Clear filter')}
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Featured Opinion - only show if no tag filter is active */}
          {featuredOpinion && activeCategory === OPINION_CATEGORY_KEYS.ALL_OPINIONS && !activeTag && (
            <div className="mb-16">
              <FeaturedOpinion
                opinion={featuredOpinion}
                onTagClick={handleTagClick}
              />
            </div>
          )}

          {/* Opinions Section */}
          {sortedOpinions.length > 0 ? (
            <>
              <div className="mb-12">
                <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  {activeTag
                    ? getTagResultsTitle()
                    : activeCategory === OPINION_CATEGORY_KEYS.ALL_OPINIONS
                      ? translateOpinionField('opinions.section.title', 'Latest Opinions')
                      : `${getTranslatedCategory(activeCategory)} ${translateOpinionField('opinions.categoryOpinionsSuffix', 'Opinions')}`
                  }
                </h2>
                <p className="text-muted-foreground text-lg">
                  {activeTag
                    ? translateOpinionField(
                        'opinions.showingTagResults',
                        'Showing all opinions with the selected tag'
                      )
                    : activeCategory === OPINION_CATEGORY_KEYS.ALL_OPINIONS
                      ? translateOpinionField(
                          'opinions.section.subtitle',
                          'Perspectives and analysis from thought leaders in women\'s health'
                        )
                      : `${translateOpinionField('opinions.browsePrefix', 'Browse our')} ${getTranslatedCategory(activeCategory).toLowerCase()} ${translateOpinionField('opinions.browseSuffix', 'opinions and analysis')}`
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedOpinions
                  .filter(opinion => !opinion.isFeatured || activeCategory !== OPINION_CATEGORY_KEYS.ALL_OPINIONS || activeTag)
                  .map((opinion) => (
                    <OpinionCard
                      key={opinion.id}
                      opinion={opinion}
                      onTagClick={handleTagClick}
                    />
                  ))
                }
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="font-display text-xl text-muted-foreground">
                {noOpinionsMessage}
              </p>
            </div>
          )}

          {/* CTA Section */}
          <OpinionsCTA />
        </div>
      </div>
      </Layout>
    </>
  );
}
