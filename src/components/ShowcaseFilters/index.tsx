import React, {type CSSProperties} from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import {TagList, type TagType, useTranslatedTags} from '@site/src/data/femtech-companies';
import Heading from '@theme/Heading';
import ShowcaseTagSelect from '../ShowcaseTagSelect';
import OperatorButton from '../OperatorButton';
import ClearAllButton from '../ClearAllButton';
import {useFilteredCompanies, useCompanyCountPlural} from '@site/src/utils/useFilteredCompanies';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

function TagCircleIcon({color, style}: {color: string; style?: CSSProperties}) {
  return (
    <span
      style={{
        backgroundColor: color,
        width: 10,
        height: 10,
        borderRadius: '50%',
        ...style,
      }}
    />
  );
}

function ShowcaseTagListItem({tag}: {tag: TagType}) {
  const translatedTags = useTranslatedTags();
  const {label, description, color} = translatedTags[tag];
  return (
    <li className={styles.tagListItem}>
      <ShowcaseTagSelect
        tag={tag}
        label={label}
        description={description}
        icon={
          <TagCircleIcon
            color={color}
            style={{
              backgroundColor: color,
              marginLeft: 8,
            }}
          />
        }
      />
    </li>
  );
}

function ShowcaseTagList() {
  return (
    <ul className={clsx('clean-list', styles.tagList)}>
      {TagList.map((tag) => {
        return <ShowcaseTagListItem key={tag} tag={tag} />;
      })}
    </ul>
  );
}

function HeadingText() {
  const filteredCompanies = useFilteredCompanies();
  const companyCountPlural = useCompanyCountPlural();
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  return (
    <div className={styles.headingText}>
      <Heading as="h2">
        {currentLocale === 'zh-Hans' ? '筛选' : translate({
          id: 'theme.showcase.filters.title',
          message: 'Filters',
        })}
      </Heading>
      <span>{companyCountPlural(filteredCompanies.length)}</span>
    </div>
  );
}

function HeadingButtons() {
  return (
    <div className={styles.headingButtons}>
      <OperatorButton />
      <ClearAllButton />
    </div>
  );
}

function HeadingRow() {
  return (
    <div className={clsx('margin-bottom--sm', styles.headingRow)}>
      <HeadingText />
      <HeadingButtons />
    </div>
  );
}

export default function ShowcaseFilters() {
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <HeadingRow />
      <ShowcaseTagList />
    </section>
  );
} 