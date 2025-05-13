import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {sortedCompanies, type Company} from '@site/src/data/femtech-companies';
import Heading from '@theme/Heading';
import ShowcaseCard from '@site/src/components/ShowcaseCard';
import {useFilteredCompanies} from '@site/src/utils/useFilteredCompanies';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

function HeadingNoResult() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  return (
    <Heading as="h2">
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
    <Heading as="h2">
      {currentLocale === 'zh-Hans' ? '所有公司' : translate({
        id: 'theme.showcase.companyList.allCompanies',
        message: 'All Companies'
      })}
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