/**
 * GEO Tracker Component
 * Tracks Generative Engine Optimization performance and AI search metrics
 */

import React, { useEffect } from 'react';
import { GEOAnalytics } from '../../utils/geoAnalytics';

interface GEOTrackerProps {
  pageType?: string;
  additionalMetrics?: Record<string, any>;
}

const GEOTracker: React.FC<GEOTrackerProps> = ({ 
  pageType,
  additionalMetrics = {}
}) => {
  useEffect(() => {
    // Initialize GEO tracking
    GEOAnalytics.initializeTracking();

    // Track page-specific metrics
    if (pageType) {
      const performanceMetrics = {
        contentScore: calculateContentScore(),
        aiReadability: calculateAIReadability(),
        ...additionalMetrics
      };

      GEOAnalytics.trackPagePerformance(pageType, performanceMetrics);
    }

    // Monitor key queries for this page
    const targetQueries = GEOAnalytics.monitorQueryCoverage();
    
    // Track specific events based on page type
    switch (pageType) {
      case 'homepage':
        trackHomepageMetrics();
        break;
      case 'competition':
        trackCompetitionMetrics();
        break;
      case 'ecosystem':
        trackEcosystemMetrics();
        break;
      case 'reports':
        trackReportsMetrics();
        break;
      default:
        trackGeneralMetrics();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageType]);

  // Calculate content quality score for AI readability
  const calculateContentScore = (): number => {
    if (typeof document === 'undefined') return 0;

    const content = document.body.textContent || '';
    const wordCount = content.split(/\s+/).length;
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
    const lists = document.querySelectorAll('ul, ol').length;
    const links = document.querySelectorAll('a[href]').length;

    // Simple scoring algorithm
    let score = 0;
    if (wordCount > 300) score += 20;
    if (wordCount > 800) score += 20;
    if (headings >= 3) score += 20;
    if (lists >= 1) score += 15;
    if (links >= 5) score += 15;
    if (content.includes('FemTech') || content.includes('women')) score += 10;

    return Math.min(score, 100);
  };

  // Calculate AI readability score
  const calculateAIReadability = (): number => {
    if (typeof document === 'undefined') return 0;

    const content = document.body.textContent || '';
    
    // Check for AI-friendly elements
    let score = 0;
    
    // Structured content indicators
    if (document.querySelector('[type="application/ld+json"]')) score += 25;
    if (document.querySelector('meta[name="description"]')) score += 15;
    if (document.querySelector('script[type="text/llms.txt"]')) score += 25;
    
    // Content quality indicators
    if (content.includes('FemTech')) score += 10;
    if (content.includes('women\'s health')) score += 10;
    if (content.includes('China')) score += 5;
    if (content.includes('innovation')) score += 5;
    if (content.includes('competition')) score += 5;

    return Math.min(score, 100);
  };

  // Page-specific tracking functions
  const trackHomepageMetrics = () => {
    GEOAnalytics.trackCitation('homepage_view', 'femtech_weekend_homepage', 'entry_point');
  };

  const trackCompetitionMetrics = () => {
    GEOAnalytics.trackCitation('competition_view', 'femtech_competition_2024', 'competition_page');
  };

  const trackEcosystemMetrics = () => {
    GEOAnalytics.trackCitation('ecosystem_view', 'femtech_ecosystem_directory', 'ecosystem_page');
  };

  const trackReportsMetrics = () => {
    GEOAnalytics.trackCitation('reports_view', 'femtech_market_research', 'reports_page');
  };

  const trackGeneralMetrics = () => {
    GEOAnalytics.trackCitation('page_view', `${pageType}_content`, 'general_page');
  };

  // This component doesn't render anything visible
  return null;
};

export default GEOTracker;
