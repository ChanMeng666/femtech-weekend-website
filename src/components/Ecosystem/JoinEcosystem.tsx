import React from 'react';
import Link from '@docusaurus/Link';
import { Button } from '../ui/button';
import { translate } from '@docusaurus/Translate';

export function JoinEcosystem() {
  const title = translate({
    id: 'ecosystem.join.readyTitle',
    message: 'Ready to Join the Ecosystem?'
  });
  
  const description = translate({
    id: 'ecosystem.join.readyDescription',
    message: 'Join us and become part of the FemTech Weekend Ecosystem—a network that empowers, inspires, and celebrates everyone working to advance women\'s health.'
  });
  
  const learnMoreText = translate({
    id: 'ecosystem.join.learnMoreButton',
    message: 'Learn More'
  });
  
  const applyText = translate({
    id: 'ecosystem.join.applyButton',
    message: 'Apply to Join'
  });
  
  return (
    <div className="bg-background">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/about-us">
              <Button size="lg">{learnMoreText}</Button>
            </Link>
            <Link to="/ecosystem/join">
              <Button variant="outline" size="lg">{applyText}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 