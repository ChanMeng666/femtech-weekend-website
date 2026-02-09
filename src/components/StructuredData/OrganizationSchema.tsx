/**
 * Organization Schema Component
 * Provides structured data for FemTech Weekend organization
 */

import React from 'react';
import Head from '@docusaurus/Head';

const OrganizationSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FemTech Weekend",
    "alternateName": ["FemTech Weekend China", "女性科技周末"],
    "description": "China's first organization focusing on women's health technology challenges, pioneering women's health innovation to drive worldwide impact.",
    "url": "https://www.femtechweekend.com",
    "logo": "https://www.femtechweekend.com/img/logo/femtech_weekend_logo_new.svg",
    "foundingDate": "2024",
    "sameAs": [
      "https://linkedin.com/company/femtech-weekend",
      "https://www.femtechweekend.com",
      "https://github.com/ChanMeng666/femtech-weekend-website"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@femtechweekend.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Chinese"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressRegion": "Shanghai"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "China"
      },
      {
        "@type": "Country",
        "name": "Hong Kong"
      },
      {
        "@type": "Place",
        "name": "Global"
      }
    ],
    "knowsAbout": [
      "Women's Health Technology",
      "FemTech Innovation",
      "Healthcare Entrepreneurship",
      "Medical Technology",
      "Digital Health",
      "Reproductive Health Technology",
      "Women's Health Investment",
      "Healthcare Startups",
      "Medical Device Innovation",
      "Health Tech Regulations in China",
      "Cross-border Healthcare Partnerships",
      "FemTech Market Analysis",
      "Women's Health Research",
      "Healthcare Competition Management"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Global FemTech Community"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "FemTech Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "FemTech Competition Platform",
            "description": "Innovation challenges and hackathons for women's health technology with ¥500K+ prize pools"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Ecosystem Directory",
            "description": "Network of 200+ FemTech entrepreneurs, investors, and healthcare professionals"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Market Research & Insights",
            "description": "Investment-grade research on FemTech markets and trends in Greater China"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cross-border Partnership Facilitation",
            "description": "Bridge Chinese and international markets for women's health innovation"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5"
    },
    "event": {
      "@type": "Event",
      "name": "FemTech Weekend 2024 Competition",
      "description": "China's premier FemTech innovation challenge",
      "startDate": "2024-11-30",
      "endDate": "2024-12-01",
      "location": {
        "@type": "Place",
        "name": "Shanghai, China"
      }
    }
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Head>
  );
};

export default OrganizationSchema;
