import React from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function EcosystemMission() {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  
  const title = translate({
    id: 'ecosystem.mission.title',
    message: 'Building Bridges in Women\'s Health'
  });
  
  const paragraph1 = translate({
    id: 'ecosystem.mission.paragraph1',
    message: 'At FemTech Weekend, we recognise that women\'s health has long been underserved, underfunded, and overlooked. That\'s why we are dedicated to building bridges across disciplines—because true innovation happens when different perspectives come together.'
  });
  
  const paragraph2 = translate({
    id: 'ecosystem.mission.paragraph2',
    message: 'We believe in the power of collaboration, serendipity, and shared purpose. Whether you are a pioneering founder, a passionate investor, a corporate changemaker, an advocate, or simply enthusiastic about women\'s health innovation, you\'ll find opportunities here to CONNECT, COLLABORATE, and CREATE impact.'
  });
  
  const paragraph3 = translate({
    id: 'ecosystem.mission.paragraph3',
    message: 'Through curated programs, mentorship, workshops, and engaging events, FemTech Weekend is your gateway to breaking barriers and shaping a more equitable future in women\'s health innovation in China or connecting globally.'
  });

  // Highlighted terms
  const connectText = translate({
    id: 'ecosystem.mission.highlight.connect',
    message: 'CONNECT'
  });
  
  const collaborateText = translate({
    id: 'ecosystem.mission.highlight.collaborate',
    message: 'COLLABORATE'
  });
  
  const createText = translate({
    id: 'ecosystem.mission.highlight.create',
    message: 'CREATE'
  });
  
  // Function to render paragraph 2 with highlighted terms for non-English locales
  const renderNonEnglishParagraph2 = () => {
    if (currentLocale === 'zh-Hans') {
      // For Chinese, find and replace the English terms with highlighted Chinese terms
      const parts = paragraph2.split(/CONNECT|COLLABORATE|CREATE/);
      if (parts.length === 4) {
        return (
          <>
            {parts[0]}
            <span className="font-bold text-primary">{connectText}</span>
            {parts[1]}
            <span className="font-bold text-primary">{collaborateText}</span>
            {parts[2]}
            <span className="font-bold text-primary">{createText}</span>
            {parts[3]}
          </>
        );
      }
    }
    
    // Fallback for other languages or if the split didn't work as expected
    return paragraph2;
  };
  
  return (
    <div className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
            {title}
          </h2>
          <div className="space-y-6 text-lg leading-8 text-muted-foreground">
            <p>{paragraph1}</p>
            
            {currentLocale === 'en' ? (
              // English version - split by keywords
              <p>
                {paragraph2.split('CONNECT')[0]}
                <span className="font-bold text-primary">CONNECT</span>
                {paragraph2.split('CONNECT')[1].split('COLLABORATE')[0]}
                <span className="font-bold text-primary">COLLABORATE</span>
                {paragraph2.split('COLLABORATE')[1].split('CREATE')[0]}
                <span className="font-bold text-primary">CREATE</span>
                {paragraph2.split('CREATE')[1]}
              </p>
            ) : (
              // Non-English version
              <p>{renderNonEnglishParagraph2()}</p>
            )}
            
            <p>{paragraph3}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 