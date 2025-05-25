import React from 'react';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { type Company, TagList, useTranslatedTags } from '@site/src/data/femtech-companies';
import { sortBy } from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { cn } from '@site/src/lib/utils';

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

function CompanyTags({tags}: {tags: string[]}) {
  const translatedTags = useTranslatedTags();
  const tagObjects = tags.map((tag) => ({tag, ...translatedTags[tag]}));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <ul className="flex flex-wrap">
      {tagObjectsSorted.map((tagObject, index) => {
        return <TagItem key={index} {...tagObject} />;
      })}
    </ul>
  );
}

type CompanyDetailModalProps = {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
};

export default function CompanyDetailModal({
  company,
  isOpen,
  onClose,
}: CompanyDetailModalProps): React.ReactElement | null {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  if (!isOpen) return null;
  
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <Heading as="h3" className="text-2xl font-bold">
              {company.title}
            </Heading>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
          
          {company.location && (
            <div>
              <span className="font-medium text-foreground">
                {currentLocale === 'zh-Hans' ? '地点: ' : translate({
                  id: 'theme.showcase.detail.location',
                  message: 'Location: ',
                })}
              </span>
              <span className="text-muted-foreground">{company.location}</span>
            </div>
          )}
          
          {company.description && (
            <div>
              <span className="font-medium text-foreground block mb-2">
                {currentLocale === 'zh-Hans' ? '公司简介: ' : translate({
                  id: 'theme.showcase.detail.description',
                  message: 'Company Description: ',
                })}
              </span>
              <p className="text-muted-foreground whitespace-pre-line">{company.description}</p>
            </div>
          )}
          
          {company.founders && (
            <div>
              <span className="font-medium text-foreground">
                {currentLocale === 'zh-Hans' ? '创始人: ' : translate({
                  id: 'theme.showcase.detail.founder',
                  message: 'Founder: ',
                })}
              </span>
              <span className="text-muted-foreground">{company.founders}</span>
            </div>
          )}
          
          {company.website && (
            <div>
              <span className="font-medium text-foreground">
                {currentLocale === 'zh-Hans' ? '网站: ' : translate({
                  id: 'theme.showcase.detail.website',
                  message: 'Website: ',
                })}
              </span>
              {company.website !== '#' ? (
                <Link href={company.website} className="text-primary hover:underline">
                  {company.website}
                </Link>
              ) : (
                <span className="text-muted-foreground">未提供</span>
              )}
            </div>
          )}
          
          {company.investors && company.investors.length > 0 && (
            <div>
              <span className="font-medium text-foreground block mb-2">
                {currentLocale === 'zh-Hans' ? '投资方: ' : translate({
                  id: 'theme.showcase.detail.investors',
                  message: 'Investors: ',
                })}
              </span>
              <ul className="list-disc pl-5 text-muted-foreground">
                {company.investors.map((investor, index) => (
                  <li key={index}>{investor}</li>
                ))}
              </ul>
            </div>
          )}
          
          {company.fundingInfo && company.fundingInfo.length > 0 && (
            <div>
              <span className="font-medium text-foreground block mb-2">
                {currentLocale === 'zh-Hans' ? '融资情况: ' : translate({
                  id: 'theme.showcase.detail.funding',
                  message: 'Funding History: ',
                })}
              </span>
              <ul className="list-disc pl-5 text-muted-foreground">
                {company.fundingInfo.map((funding, index) => (
                  <li key={index}>
                    {funding.round} ({funding.date}) {funding.amount && `- ${funding.amount}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {company.tags && company.tags.length > 0 && (
            <div>
              <span className="font-medium text-foreground block mb-2">
                {currentLocale === 'zh-Hans' ? '标签: ' : translate({
                  id: 'theme.showcase.detail.tags',
                  message: 'Tags: ',
                })}
              </span>
              <CompanyTags tags={company.tags} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 