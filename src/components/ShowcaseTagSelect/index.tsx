import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useQueryStringList} from '@docusaurus/theme-common';
import {TagType} from '@site/src/data/femtech-companies';
import styles from './styles.module.css';

export default function ShowcaseTagSelect({
  tag,
  label,
  description,
  icon,
}: {
  tag: TagType;
  label: string;
  description: string;
  icon: ReactNode;
}): ReactNode {
  const [tags, setTags] = useQueryStringList('tags');
  const selected = tags.includes(tag);
  const toggleTag = () => {
    const newTags = selected
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    setTags(newTags);
  };
  return (
    <button
      type="button"
      className={clsx(
        'button button--outline button--secondary',
        styles.tagButton,
        {[styles.tagButtonSelected]: selected},
      )}
      onClick={toggleTag}
      aria-label={`${label} ${description}`}>
      <span className={styles.tagLabel}>{label}</span>
      {icon}
    </button>
  );
} 