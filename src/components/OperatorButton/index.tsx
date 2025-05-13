import React from 'react';
import Translate from '@docusaurus/Translate';
import {useOperator} from '@site/src/utils/useFilteredCompanies';
import styles from './styles.module.css';

export default function OperatorButton() {
  const [operator, toggleOperator] = useOperator();
  return (
    <button
      type="button"
      className={`button button--sm button--${
        operator === 'OR' ? 'secondary' : 'primary'
      }`}
      onClick={toggleOperator}>
      <Translate
        id="showcase.filters.operator"
        values={{
          operator,
        }}>
        {'Filter criteria: {operator}'}
      </Translate>
    </button>
  );
} 