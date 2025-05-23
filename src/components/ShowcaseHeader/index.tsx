import React from 'react';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { ShowcaseHeaderProps } from '@site/src/types/showcase';

export default function ShowcaseHeader({ className }: ShowcaseHeaderProps = {}): React.ReactNode {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  return (
    <div className={`bg-background py-12 sm:py-16 ${className || ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Heading as="h1" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          {translate({
            id: 'header.title',
            message: 'FemTech Companies Showcase',
          })}
        </Heading>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          {translate({
            id: 'header.description',
            message: 'Directory of innovative companies in the women\'s health industry in China',
          })}
        </p>
      </div>
    </div>
  );
} 