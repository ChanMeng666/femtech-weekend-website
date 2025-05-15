import React from 'react';
import {translate} from '@docusaurus/Translate';
import {sortedCompanies, type Company} from '@site/src/data/femtech-companies';
import Heading from '@theme/Heading';
import ShowcaseCard from '@site/src/components/ShowcaseCard';
import {useFilteredCompanies} from '@site/src/utils/useFilteredCompanies';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function HeadingNoResult() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  return (
    <Heading as="h2" className="text-2xl font-bold text-foreground">
      {currentLocale === 'zh-Hans' ? '无结果' : translate({
        id: 'theme.showcase.companyList.noResult',
        message: 'No results'
      })}
    </Heading>
  );
}

function HeadingAllCompanies() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  return (
    <Heading as="h2" className="text-2xl font-bold text-foreground mb-6">
      {currentLocale === 'zh-Hans' ? '所有公司' : translate({
        id: 'theme.showcase.companyList.allCompanies',
        message: 'All Companies'
      })}
    </Heading>
  );
}

function CardList({heading, items}: {heading?: React.ReactNode; items: Company[]}) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {heading}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ShowcaseCard key={item.title} company={item} />
        ))}
      </ul>
    </div>
  );
}

function NoResultSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <HeadingNoResult />
        <p className="mt-4 text-muted-foreground">
          Try adjusting your filters to find what you're looking for.
        </p>
      </div>
    </section>
  );
}

export default function ShowcaseCards() {
  const filteredCompanies = useFilteredCompanies();

  if (filteredCompanies.length === 0) {
    return <NoResultSection />;
  }

  return (
    <section className="py-12">
      <CardList 
        heading={filteredCompanies.length === sortedCompanies.length ? <HeadingAllCompanies /> : undefined} 
        items={filteredCompanies} 
      />
    </section>
  );
} 