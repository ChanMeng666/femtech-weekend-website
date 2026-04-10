import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useOperator} from '@site/src/utils/useFilteredCompanies';
import { cn } from '../../lib/utils';

export default function OperatorButton() {
  const [operator, toggleOperator] = useOperator();

  return (
    <button
      type="button"
      className={cn(
        "px-4 py-2 text-xs font-medium transition-all hover:scale-[1.02] hover:shadow-md",
        operator === 'OR'
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
          : "bg-primary text-primary-foreground hover:bg-primary-dark"
      )}
      onClick={toggleOperator}>
      {translate(
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