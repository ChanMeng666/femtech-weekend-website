import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useOperator} from '@site/src/utils/useFilteredCompanies';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { cn } from '../../lib/utils';

export default function OperatorButton() {
  const [operator, toggleOperator] = useOperator();
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  return (
    <button
      type="button"
      className={cn(
        "rounded-md px-3 py-2 text-xs font-medium transition-colors",
        operator === 'OR' 
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
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