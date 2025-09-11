/**
 * GEO (Generative Engine Optimization) Analytics Utilities
 * For tracking AI search performance and optimization metrics
 */

export const GEOAnalytics = {
  // Core monitoring metrics
  trackCitation: (source, context, position) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ai_citation', {
        event_category: 'GEO Performance',
        event_label: source,
        citation_context: context,
        citation_position: position,
        custom_parameter_1: 'femtech_weekend_citation'
      });
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('GEO Citation Tracked:', {
        source,
        context,
        position,
        timestamp: new Date().toISOString()
      });
    }
  },

  trackAITraffic: (referrer, query, userAgent) => {
    const isAITraffic = GEOAnalytics.detectAITraffic(referrer, userAgent);
    
    if (isAITraffic && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ai_traffic', {
        event_category: 'GEO Performance',
        ai_source: GEOAnalytics.identifyAISource(referrer, userAgent),
        search_query: query,
        traffic_type: 'ai_generated'
      });
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development' && isAITraffic) {
      console.log('AI Traffic Detected:', {
        source: GEOAnalytics.identifyAISource(referrer, userAgent),
        referrer,
        userAgent,
        query,
        timestamp: new Date().toISOString()
      });
    }

    return isAITraffic;
  },

  detectAITraffic: (referrer, userAgent) => {
    const aiIndicators = [
      // Popular AI search engines and chatbots
      'chatgpt', 'claude', 'bard', 'perplexity', 
      'copilot', 'gemini', 'you.com', 'phind',
      'openai', 'anthropic', 'character.ai',
      'bing chat', 'search.brave.com', 'kagi',
      // AI crawler identifiers
      'gptbot', 'claude-web', 'anthropic-ai',
      'openai-searchbot', 'google-extended',
      'perplexitybot'
    ];
    
    const referrerStr = (referrer || '').toLowerCase();
    const userAgentStr = (userAgent || '').toLowerCase();
    
    return aiIndicators.some(indicator => 
      referrerStr.includes(indicator) || userAgentStr.includes(indicator)
    );
  },

  identifyAISource: (referrer, userAgent) => {
    const sources = {
      'chatgpt': 'ChatGPT',
      'claude': 'Claude',
      'bard': 'Bard',
      'gemini': 'Gemini',
      'perplexity': 'Perplexity',
      'copilot': 'Microsoft Copilot',
      'you.com': 'You.com',
      'phind': 'Phind',
      'character.ai': 'Character.AI',
      'bing chat': 'Bing Chat',
      'search.brave.com': 'Brave Search',
      'kagi': 'Kagi',
      'gptbot': 'OpenAI GPTBot',
      'anthropic-ai': 'Anthropic AI',
      'openai-searchbot': 'OpenAI SearchBot'
    };

    const combined = `${referrer} ${userAgent}`.toLowerCase();
    
    for (const [key, value] of Object.entries(sources)) {
      if (combined.includes(key)) {
        return value;
      }
    }
    
    return 'Unknown AI Source';
  },

  // Query coverage monitoring
  monitorQueryCoverage: () => {
    const targetQueries = [
      // Primary FemTech queries
      'FemTech China market size',
      'women health technology investment trends',
      'Chinese FemTech companies list',
      'female health innovation competition 2024',
      
      // Investment and ecosystem queries
      'women health startup accelerator China',
      'FemTech regulatory environment China',
      'women health technology partnerships',
      'FemTech venture capital Asia',
      
      // Competition and events
      'FemTech hackathon China',
      'women health innovation challenge',
      'reproductive health technology competition',
      
      // Market analysis queries
      'Greater China women health market',
      'Hong Kong FemTech ecosystem',
      'China women health policy 2024',
      'Asia Pacific FemTech trends'
    ];

    // Log target queries for monitoring
    if (process.env.NODE_ENV === 'development') {
      console.log('GEO Target Queries:', targetQueries);
    }

    return targetQueries;
  },

  // Track page performance for AI optimization
  trackPagePerformance: (pageType, metrics) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'geo_page_performance', {
        event_category: 'GEO Performance',
        page_type: pageType,
        load_time: metrics.loadTime,
        content_score: metrics.contentScore,
        ai_readability: metrics.aiReadability
      });
    }

    // Store in localStorage for dashboard
    if (typeof window !== 'undefined' && window.localStorage) {
      const geoData = JSON.parse(localStorage.getItem('geo_performance') || '{}');
      geoData[pageType] = {
        ...metrics,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('geo_performance', JSON.stringify(geoData));
    }
  },

  // Initialize GEO tracking on page load
  initializeTracking: () => {
    if (typeof window === 'undefined') return;

    // Track referrer information
    const referrer = document.referrer;
    const userAgent = navigator.userAgent;
    const currentPath = window.location.pathname;
    
    // Check for AI traffic
    const isAITraffic = GEOAnalytics.trackAITraffic(referrer, null, userAgent);
    
    // Track page load for GEO analysis
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      GEOAnalytics.trackPagePerformance(GEOAnalytics.getPageType(currentPath), {
        loadTime: Math.round(loadTime),
        referrer: referrer,
        isAITraffic: isAITraffic,
        userAgent: userAgent
      });
    });

    // Set up query parameter tracking
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || urlParams.get('query') || urlParams.get('search');
    
    if (query && isAITraffic) {
      GEOAnalytics.trackCitation('organic_search', query, 'direct_visit');
    }
  },

  // Helper to determine page type
  getPageType: (pathname) => {
    if (pathname === '/') return 'homepage';
    if (pathname.startsWith('/competition')) return 'competition';
    if (pathname.startsWith('/ecosystem')) return 'ecosystem';
    if (pathname.startsWith('/reports')) return 'reports';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/docs')) return 'docs';
    if (pathname.startsWith('/about')) return 'about';
    return 'other';
  },

  // Get stored GEO performance data
  getPerformanceData: () => {
    if (typeof window === 'undefined') return {};
    
    try {
      return JSON.parse(localStorage.getItem('geo_performance') || '{}');
    } catch (error) {
      console.error('Error reading GEO performance data:', error);
      return {};
    }
  }
};

// Auto-initialize tracking when module is loaded
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      GEOAnalytics.initializeTracking();
    });
  } else {
    GEOAnalytics.initializeTracking();
  }
}
