import React from 'react';import clsx from 'clsx';import Link from '@docusaurus/Link';import {translate} from '@docusaurus/Translate';import {TagList, type TagType, type Company, useTranslatedTags} from '@site/src/data/femtech-companies';import {sortBy} from '@site/src/utils/jsUtils';import Heading from '@theme/Heading';import useDocusaurusContext from '@docusaurus/useDocusaurusContext';import styles from './styles.module.css';

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
    <li className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label}</span>
      <span className={styles.colorLabel} style={{backgroundColor: color}} />
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
    <li key={company.title} className="card shadow--md">
      <div className="card__body">
        <div className={clsx(styles.showcaseCardHeader)}>
          <Heading as="h4" className={styles.showcaseCardTitle}>
            <Link href={company.website} className={styles.showcaseCardLink}>
              {company.title}
            </Link>
          </Heading>
          {company.location && (
            <span className={styles.showcaseCardLocation}>
              {company.location}
            </span>
          )}
        </div>
        <p className={styles.showcaseCardBody}>{company.description}</p>
        
        {company.founders && (
          <div className={styles.showcaseCardDetail}>
            <strong>
              {currentLocale === 'zh-Hans' ? '创始人:' : translate({
                id: 'theme.showcase.card.founder',
                message: 'Founder:',
              })}
            </strong> {company.founders}
          </div>
        )}
        
        {latestFunding && (
          <div className={styles.showcaseCardDetail}>
            <strong>
              {currentLocale === 'zh-Hans' ? '融资:' : translate({
                id: 'theme.showcase.card.funding',
                message: 'Funding:',
              })}
            </strong> {latestFunding.round} ({latestFunding.date}) {latestFunding.amount && `- ${latestFunding.amount}`}
          </div>
        )}
      </div>
      <ul className={clsx('card__footer', styles.cardFooter)}>
        <ShowcaseCardTag tags={company.tags} />
      </ul>
    </li>
  );
}

export default React.memo(ShowcaseCard); 