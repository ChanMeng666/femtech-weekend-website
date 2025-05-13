import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useQueryString, useQueryStringList} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function ClearAllButton() {
  const [, setTags] = useQueryStringList('tags');
  const [, setSearchName] = useQueryString('name');
  const [, setOperator] = useQueryString('operator');
  const {i18n: {currentLocale}} = useDocusaurusContext();

  const clearAll = () => {
    setTags([]);
    setSearchName(null);
    setOperator(null);
  };

  return (
    <button
      type="button"
      className="button button--sm button--outline button--danger"
      onClick={clearAll}>
      {currentLocale === 'zh-Hans' ? '清除筛选' : translate({
        id: 'theme.showcase.filters.clearAll',
        message: 'Clear filters',
      })}
    </button>
  );
} 