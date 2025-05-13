import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {Tags, TagList, type TagType, type Company} from '@site/src/data/femtech-companies';
import {sortBy} from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

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
  const tagObjects = tags.map((tag) => ({tag, ...Tags[tag]}));

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
              <Translate id="showcase.card.founder">Founder:</Translate>
            </strong> {company.founders}
          </div>
        )}
        
        {latestFunding && (
          <div className={styles.showcaseCardDetail}>
            <strong>
              <Translate id="showcase.card.funding">Funding:</Translate>
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