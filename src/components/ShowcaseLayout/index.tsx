import React from 'react';
import ShowcaseHeader from '@site/src/components/ShowcaseHeader';
import ShowcaseFilters from '@site/src/components/ShowcaseFilters';
import ShowcaseSearchBar from '@site/src/components/ShowcaseSearchBar';
import ShowcaseCards from '@site/src/components/ShowcaseCards';
import type { ShowcaseLayoutProps } from '@site/src/types/showcase';

export default function ShowcaseLayout({ children }: ShowcaseLayoutProps = {}): React.ReactNode {
  return (
    <main className="bg-background min-h-screen">
      <ShowcaseHeader />
      <div className="relative -mt-8 z-10">
        <ShowcaseFilters />
      </div>
      <div
        style={{display: 'flex', marginLeft: 'auto'}}
        className="container">
        <ShowcaseSearchBar />
      </div>
      <ShowcaseCards />
      {children}
    </main>
  );
} 