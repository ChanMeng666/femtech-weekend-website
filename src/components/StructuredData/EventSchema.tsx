/**
 * Event Schema Component
 * Provides structured data for FemTech Weekend competitions and events
 */

import React from 'react';
import Head from '@docusaurus/Head';

interface EventSchemaProps {
  eventData?: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location?: string;
    prizeAmount?: string;
    registrationUrl?: string;
  };
}

const EventSchema: React.FC<EventSchemaProps> = ({ eventData }) => {
  const defaultEvent = {
    name: "FemTech Weekend 2024 Competition",
    description: "China's premier FemTech innovation challenge focusing on women's health technology solutions across four categories: Reproductive Health, Mental Health & Wellness, Preventive Care, and Chronic Disease Management.",
    startDate: "2024-11-30",
    endDate: "2024-12-01",
    location: "Shanghai, China",
    prizeAmount: "500000",
    registrationUrl: "https://www.femtechweekend.com/competition"
  };

  const event = eventData || defaultEvent;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Shanghai",
        "addressCountry": "CN"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "FemTech Weekend",
      "url": "https://www.femtechweekend.com",
      "sameAs": [
        "https://linkedin.com/company/femtech-weekend",
        "https://www.femtechweekend.com"
      ]
    },
    "offers": {
      "@type": "Offer",
      "name": "Competition Registration",
      "price": "0",
      "priceCurrency": "CNY",
      "availability": "https://schema.org/InStock",
      "url": event.registrationUrl,
      "validFrom": "2024-09-01",
      "validThrough": "2024-10-20"
    },
    "award": [
      {
        "@type": "MonetaryGrant",
        "name": "Grand Prize",
        "amount": {
          "@type": "MonetaryAmount",
          "value": "200000",
          "currency": "CNY"
        },
        "description": "Grand prize winner receives ¥200,000 plus incubation program placement"
      },
      {
        "@type": "MonetaryGrant",
        "name": "Total Prize Pool",
        "amount": {
          "@type": "MonetaryAmount",
          "value": event.prizeAmount,
          "currency": "CNY"
        },
        "description": "Total prize pool for FemTech innovation competition"
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": [
        "Healthcare Entrepreneurs",
        "FemTech Startups",
        "Women's Health Innovators",
        "Medical Technology Developers",
        "Healthcare Professionals"
      ],
      "geographicArea": [
        {
          "@type": "Country",
          "name": "China"
        },
        {
          "@type": "Country",
          "name": "Global"
        }
      ]
    },
    "keywords": [
      "FemTech",
      "Women's Health",
      "Innovation Competition",
      "Healthcare Technology",
      "Startup Competition",
      "Medical Innovation",
      "Digital Health",
      "Reproductive Health",
      "Mental Health",
      "Preventive Care"
    ],
    "category": [
      "Reproductive Health Technology",
      "Mental Health & Wellness",
      "Preventive Care Innovation",
      "Chronic Disease Management"
    ],
    "performer": [
      {
        "@type": "Organization",
        "name": "Industry Mentors",
        "description": "30+ healthcare and technology experts providing guidance"
      },
      {
        "@type": "Organization",
        "name": "Investment Partners",
        "description": "20+ VCs and angels supporting participant startups"
      }
    ],
    "sponsor": {
      "@type": "Organization",
      "name": "FemTech Weekend Partners",
      "description": "Healthcare organizations and investors supporting women's health innovation"
    },
    "subEvent": [
      {
        "@type": "Event",
        "name": "Registration & Application",
        "startDate": "2024-09-01",
        "endDate": "2024-10-20",
        "description": "Open registration period for team applications"
      },
      {
        "@type": "Event",
        "name": "Initial Screening",
        "startDate": "2024-11-01",
        "endDate": "2024-11-20",
        "description": "Expert panel review and semifinalist selection"
      },
      {
        "@type": "Event",
        "name": "Mentorship Phase",
        "startDate": "2024-11-23",
        "endDate": "2024-11-29",
        "description": "Selected teams receive expert mentorship"
      },
      {
        "@type": "Event",
        "name": "Final Pitch Weekend",
        "startDate": "2024-11-30",
        "endDate": "2024-12-01",
        "description": "Final presentations to judges and investors"
      }
    ]
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Head>
  );
};

export default EventSchema;
