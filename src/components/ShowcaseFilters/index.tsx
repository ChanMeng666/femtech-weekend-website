import React, {type CSSProperties} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {TagList, type TagType, useTranslatedTags} from '@site/src/data/femtech-companies';
import Heading from '@theme/Heading';
import ShowcaseTagSelect from '../ShowcaseTagSelect';
import OperatorButton from '../OperatorButton';
import ClearAllButton from '../ClearAllButton';
import {useFilteredCompanies, useCompanyCountPlural} from '@site/src/utils/useFilteredCompanies';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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
    <li className="mr-4 mb-4 list-none">
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
    <ul className="flex flex-wrap pt-2 list-none">
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
    <div className="flex items-center">
      <Heading as="h2" className="text-2xl font-bold text-foreground mr-4 mb-0">
        {currentLocale === 'zh-Hans' ? '筛选' : translate({
          id: 'theme.showcase.filters.title',
          message: 'Filters',
        })}
      </Heading>
      <span className="text-sm text-muted-foreground">{companyCountPlural(filteredCompanies.length)}</span>
    </div>
  );
}

function HeadingButtons() {
  return (
    <div className="flex gap-2">
      <OperatorButton />
      <ClearAllButton />
    </div>
  );
}

function HeadingRow() {
  return (
    <div className="flex justify-between items-center mb-6 md:flex-row flex-col md:items-center items-start">
      <HeadingText />
      <div className="md:mt-0 mt-4">
        <HeadingButtons />
      </div>
    </div>
  );
}

export default function ShowcaseFilters() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-card border border-border p-6">
        <HeadingRow />
        <ShowcaseTagList />
      </div>
    </section>
  );
} 