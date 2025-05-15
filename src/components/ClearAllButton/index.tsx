import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useQueryString, useQueryStringList} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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
      className="rounded-md px-3 py-2 text-xs font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
      onClick={clearAll}>
      {currentLocale === 'zh-Hans' ? '清除筛选' : translate({
        id: 'theme.showcase.filters.clearAll',
        message: 'Clear filters',
      })}
    </button>
  );
} 