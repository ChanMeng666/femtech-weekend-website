import React, { useState } from 'react';
import {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {TagList, type TagType, type Company, useTranslatedTags} from '@site/src/data/femtech-companies';
import {sortBy} from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { cn } from '../../lib/utils';
import CompanyDetailModal from '../common/CompanyDetailModal';

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
      <span className="text-xs text-muted-foreground dark:text-slate-300">{label}</span>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const latestFunding = company.fundingInfo.length > 0 
    ? company.fundingInfo[0] 
    : null;
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  return (
    <>
      <li 
        className="group relative rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50 overflow-hidden cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-700"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <Heading as="h4" className="text-lg font-semibold leading-tight mb-1">
              <span className="text-foreground group-hover:text-primary transition-colors dark:text-slate-50">
                {company.title}
              </span>
            </Heading>
            {company.location && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full dark:bg-slate-700 dark:text-slate-200">
                {company.location}
              </span>
            )}
          </div>
          
          {/* Only show a short preview of the description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 dark:text-slate-300">
            {company.description}
          </p>
          
          <div className="space-y-2">
            {company.founders && (
              <div className="text-xs">
                <span className="font-medium text-foreground dark:text-slate-100">
                  {currentLocale === 'zh-Hans' ? '创始人: ' : translate({
                    id: 'theme.showcase.card.founder',
                    message: 'Founder: ',
                  })}
                </span>
                <span className="text-muted-foreground dark:text-slate-300">{company.founders}</span>
              </div>
            )}
            
            {latestFunding && (
              <div className="text-xs">
                <span className="font-medium text-foreground dark:text-slate-100">
                  {currentLocale === 'zh-Hans' ? '融资: ' : translate({
                    id: 'theme.showcase.card.funding',
                    message: 'Funding: ',
                  })}
                </span>
                <span className="text-muted-foreground dark:text-slate-300">
                  {latestFunding.round} ({latestFunding.date}) {latestFunding.amount && `- ${latestFunding.amount}`}
                </span>
              </div>
            )}
            
            {company.investors && company.investors.length > 0 && (
              <div className="text-xs">
                <span className="font-medium text-foreground dark:text-slate-100">
                  {currentLocale === 'zh-Hans' ? '投资方: ' : translate({
                    id: 'theme.showcase.card.investors',
                    message: 'Investors: ',
                  })}
                </span>
                <span className="text-muted-foreground dark:text-slate-300 line-clamp-1">
                  {company.investors.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-border px-6 py-3 bg-accent/10 dark:bg-slate-900 dark:border-slate-700">
          <ul className="flex flex-wrap">
            <ShowcaseCardTag tags={company.tags} />
          </ul>
        </div>
      </li>
      
      <CompanyDetailModal 
        company={company}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default React.memo(ShowcaseCard); 