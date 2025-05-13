import React from 'react';
import Translate from '@docusaurus/Translate';
import {useQueryString, useQueryStringList} from '@docusaurus/theme-common';
import styles from './styles.module.css';

export default function ClearAllButton() {
  const [, setTags] = useQueryStringList('tags');
  const [, setSearchName] = useQueryString('name');
  const [, setOperator] = useQueryString('operator');

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
      <Translate id="showcase.filters.clearAll">清除筛选</Translate>
    </button>
  );
} 