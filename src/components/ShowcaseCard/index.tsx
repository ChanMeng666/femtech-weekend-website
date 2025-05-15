import React from 'react';
import {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {TagList, type TagType, type Company, useTranslatedTags} from '@site/src/data/femtech-companies';
import {sortBy} from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { cn } from '../../lib/utils';

function TagItem({
  label,
  description,
  color,
}: {
  label: string;
  description: string;
  color: string;
}) {
  return (
    <li className="inline-flex items-center mr-2 mb-1" title={description}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="w-2 h-2 ml-1.5 rounded-full" style={{backgroundColor: color}} />
    </li>
  );
}

function ShowcaseCardTag({tags}: {tags: TagType[]}) {
  const translatedTags = useTranslatedTags();
  const tagObjects = tags.map((tag) => ({tag, ...translatedTags[tag]}));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        return <TagItem key={index} {...tagObject} />;
      })}
    </>
  );
}

function ShowcaseCard({company}: {company: Company}) {
  const latestFunding = company.fundingInfo.length > 0 
    ? company.fundingInfo[0] 
    : null;
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  return (
    <li className="group relative rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <Heading as="h4" className="text-lg font-semibold leading-tight mb-1">
            <Link href={company.website} className="text-foreground hover:text-primary no-underline transition-colors">
              {company.title}
            </Link>
          </Heading>
          {company.location && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {company.location}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>
        
        <div className="space-y-2">
          {company.founders && (
            <div className="text-xs">
              <span className="font-medium text-foreground">
                {currentLocale === 'zh-Hans' ? '创始人: ' : translate({
                  id: 'theme.showcase.card.founder',
                  message: 'Founder: ',
                })}
              </span>
              <span className="text-muted-foreground">{company.founders}</span>
            </div>
          )}
          
          {latestFunding && (
            <div className="text-xs">
              <span className="font-medium text-foreground">
                {currentLocale === 'zh-Hans' ? '融资: ' : translate({
                  id: 'theme.showcase.card.funding',
                  message: 'Funding: ',
                })}
              </span>
              <span className="text-muted-foreground">
                {latestFunding.round} ({latestFunding.date}) {latestFunding.amount && `- ${latestFunding.amount}`}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-border px-6 py-3 bg-accent/10">
        <ul className="flex flex-wrap">
          <ShowcaseCardTag tags={company.tags} />
        </ul>
      </div>
    </li>
  );
}

export default React.memo(ShowcaseCard); 