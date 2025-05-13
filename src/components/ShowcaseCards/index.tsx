import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {sortedCompanies, type Company} from '@site/src/data/femtech-companies';
import Heading from '@theme/Heading';
import ShowcaseCard from '@site/src/components/ShowcaseCard';
import {useFilteredCompanies} from '@site/src/utils/useFilteredCompanies';

import styles from './styles.module.css';

function HeadingNoResult() {
  return (
    <Heading as="h2">
      <Translate id="showcase.companyList.noResult">No results</Translate>
    </Heading>
  );
}

function HeadingAllCompanies() {
  return (
    <Heading as="h2">
      <Translate id="showcase.companyList.allCompanies">All Companies</Translate>
    </Heading>
  );
}

function CardList({heading, items}: {heading?: React.ReactNode; items: Company[]}) {
  return (
    <div className="container">
      {heading}
      <ul className={clsx('clean-list', styles.cardList)}>
        {items.map((item) => (
          <ShowcaseCard key={item.title} company={item} />
        ))}
      </ul>
    </div>
  );
}

function NoResultSection() {
  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container padding-vert--md text--center">
        <HeadingNoResult />
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
    <section className="margin-top--lg margin-bottom--xl">
      <CardList 
        heading={filteredCompanies.length === sortedCompanies.length ? <HeadingAllCompanies /> : undefined} 
        items={filteredCompanies} 
      />
    </section>
  );
} 