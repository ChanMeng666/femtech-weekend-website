import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Import types
import { StoryCategory } from '../types/stories';

// Import data and utility functions
import {
  getStoriesData,
  getFeaturedStory,
  filterStoriesByCategory,
  sortStoriesByDate
} from '../data/stories';
import { getStoriesTitle, getStoriesDescription, STORY_CATEGORY_KEYS, getTranslatedCategory } from '../constants/stories';

// Import components
import {
  StoryCard,
  FeaturedStory,
  StoriesHero,
  StoriesNavigation,
  StoriesCTA
} from '../components/Stories';
import { GEOHead, GEOTracker } from '../components';
import { translateStoryField } from '../constants/stories-components';

export default function Stories(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [activeCategory, setActiveCategory] = useState<StoryCategory>(STORY_CATEGORY_KEYS.ALL_STORIES);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get data using utility functions
  const storiesData = getStoriesData();
  const featuredStory = getFeaturedStory();

  // Handle tag click
  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    // Reset category when filtering by tag
    setActiveCategory(STORY_CATEGORY_KEYS.ALL_STORIES);
  };

  // Filter by category first
  const filteredByCategory = filterStoriesByCategory(storiesData, activeCategory);

  // Then filter by tag if one is selected
  const filteredStories = activeTag
    ? filteredByCategory.filter(story => {
        // First, check direct match in tags array
        if (story.tags.includes(activeTag)) {
          return true;
        }

        // Then, check for match across different translations of the same tag
        return story.tags.some(tag => {
          // Compare with other stories that have this tag
          return storiesData.some(otherStory =>
            otherStory.tags.includes(activeTag) && otherStory.tags.includes(tag)
          );
        });
      })
    : filteredByCategory;

  // Sort the filtered stories
  const sortedStories = sortStoriesByDate(filteredStories);

  const title = getStoriesTitle();
  const description = getStoriesDescription();

  const handleCategoryChange = (category: StoryCategory) => {
    setActiveCategory(category);
    // Reset tag filter when changing category
    setActiveTag(null);
  };

  // Translate "No stories found" message
  const noStoriesMessage = translateStoryField(
    'stories.noStoriesFound',
    'No stories found in this category. Check back soon for new content!'
  );

  // Get tag results title
  const getTagResultsTitle = () => {
    if (activeTag) {
      const tagPrefix = translateStoryField('stories.tagResultsPrefix', 'Results for tag:');
      return `${tagPrefix} ${activeTag}`;
    }
    return '';
  };

  return (
    <>
      <GEOHead
        pageType="stories"
        title={title}
        description={description}
        keywords={[
          'FemTech founder stories', 'women health entrepreneurs', 'FemTech interviews',
          'founder journeys', 'women in tech', 'health technology leaders',
          'FemTech innovators', 'startup stories', 'women health pioneers',
          'entrepreneurship', 'investor perspectives', 'career journeys'
        ]}
        additionalInstructions="This page features character interviews and inspiring stories from founders, investors, researchers, and innovators in the women's health technology space."
        language="en"
      />
      <Layout
        title={title}
        description={description}>

        <GEOTracker
          pageType="stories"
          additionalMetrics={{
            storyCount: storiesData.length,
            featuredStory: featuredStory ? 1 : 0,
            categories: Object.keys(STORY_CATEGORY_KEYS).length,
            activeFilter: activeCategory
          }}
        />

        {/* Hero Section */}
        <StoriesHero />

      {/* Navigation Categories */}
      <StoriesNavigation
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
                {translateStoryField('stories.filteringByTag', 'Filtering by tag:')}
              </div>
              <div className="flex items-center border border-primary/30 px-4 py-2">
                <span className="mckinsey-label text-primary mr-3">{activeTag}</span>
                <button
                  onClick={() => setActiveTag(null)}
                  className="text-primary hover:text-primary/70 transition-colors text-lg leading-none"
                  aria-label={translateStoryField('stories.clearFilter', 'Clear filter')}
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Featured Story - only show if no tag filter is active */}
          {featuredStory && activeCategory === STORY_CATEGORY_KEYS.ALL_STORIES && !activeTag && (
            <div className="mb-16">
              <FeaturedStory
                story={featuredStory}
                onTagClick={handleTagClick}
              />
            </div>
          )}

          {/* Stories Section */}
          {sortedStories.length > 0 ? (
            <>
              <div className="mb-12">
                <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  {activeTag
                    ? getTagResultsTitle()
                    : activeCategory === STORY_CATEGORY_KEYS.ALL_STORIES
                      ? translateStoryField('stories.section.title', 'Latest Stories')
                      : `${getTranslatedCategory(activeCategory)} ${translateStoryField('stories.categoryStoriesSuffix', 'Stories')}`
                  }
                </h2>
                <p className="text-muted-foreground text-lg">
                  {activeTag
                    ? translateStoryField(
                        'stories.showingTagResults',
                        'Showing all stories with the selected tag'
                      )
                    : activeCategory === STORY_CATEGORY_KEYS.ALL_STORIES
                      ? translateStoryField(
                          'stories.section.subtitle',
                          'Discover the journeys of women shaping the future of health technology'
                        )
                      : `${translateStoryField('stories.browsePrefix', 'Browse our')} ${getTranslatedCategory(activeCategory).toLowerCase()} ${translateStoryField('stories.browseSuffix', 'stories and interviews')}`
                  }
                </p>
              </div>

              {/* 2-column grid for horizontal story cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sortedStories
                  .filter(story => !story.isFeatured || activeCategory !== STORY_CATEGORY_KEYS.ALL_STORIES || activeTag)
                  .map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      onTagClick={handleTagClick}
                    />
                  ))
                }
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="font-display text-xl text-muted-foreground">
                {noStoriesMessage}
              </p>
            </div>
          )}

          {/* CTA Section */}
          <StoriesCTA />
        </div>
      </div>
      </Layout>
    </>
  );
}
