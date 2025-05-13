import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useOperator} from '@site/src/utils/useFilteredCompanies';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function OperatorButton() {
  const [operator, toggleOperator] = useOperator();
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  return (
    <button
      type="button"
      className={`button button--sm button--${
        operator === 'OR' ? 'secondary' : 'primary'
      }`}
      onClick={toggleOperator}>
      {currentLocale === 'zh-Hans' ? `筛选条件: ${operator}` : translate(
        {
          id: 'theme.showcase.filters.operator',
          message: 'Filter criteria: {operator}',
        },
        {
          operator,
        }
      )}
    </button>
  );
} 