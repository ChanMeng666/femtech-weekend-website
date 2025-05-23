import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useSearchName} from '@site/src/utils/useFilteredCompanies';
import styles from './styles.module.css';

export default function ShowcaseSearchBar(): React.ReactNode {
  const [searchName, setSearchName] = useSearchName();
  
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        placeholder={translate({
          message: 'Search for company name...',
          id: 'database.searchBar.placeholder',
        })}
        value={searchName}
        onInput={(e) => {
          setSearchName(e.currentTarget.value);
        }}
      />
    </div>
  );
} 