import {useMemo, useCallback} from 'react';
import {sortedCompanies, type TagType, type Company} from '../data/femtech-companies';
import {useQueryString, useQueryStringList, usePluralForm} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function useSearchName() {
  return useQueryString('name');
}

export function useTags() {
  return useQueryStringList('tags');
}

type Operator = 'OR' | 'AND';

export function useOperator() {
  const [searchOperator, setSearchOperator] = useQueryString('operator');
  const operator: Operator = searchOperator === 'AND' ? 'AND' : 'OR';
  const toggleOperator = useCallback(() => {
    const newOperator = operator === 'OR' ? 'AND' : null;
    setSearchOperator(newOperator);
  }, [operator, setSearchOperator]);
  return [operator, toggleOperator] as const;
}

function filterCompanies({
  companies,
  tags,
  operator,
  searchName,
}: {
  companies: Company[];
  tags: TagType[];
  operator: Operator;
  searchName: string | null;
}) {
  let filteredCompanies = [...companies]; // Create a copy to avoid modifying the original

  if (searchName) {
    // Filter by name
    filteredCompanies = filteredCompanies.filter((company) =>
      company.title.toLowerCase().includes(searchName.toLowerCase()) ||
      (company.description && company.description.toLowerCase().includes(searchName.toLowerCase()))
    );
  }
  
  if (tags.length === 0) {
    return filteredCompanies;
  }
  
  // Filter by tags
  return filteredCompanies.filter((company) => {
    if (company.tags.length === 0) {
      return false;
    }
    if (operator === 'AND') {
      return tags.every((tag) => company.tags.includes(tag as TagType));
    }
    return tags.some((tag) => company.tags.includes(tag as TagType));
  });
}

export function useFilteredCompanies() {
  const [tags] = useTags();
  const [searchName] = useSearchName();
  const [operator] = useOperator();
  
  return useMemo(
    () =>
      filterCompanies({
        companies: sortedCompanies,
        tags: tags as TagType[],
        operator,
        searchName,
      }),
    [tags, operator, searchName],
  );
}

export function useCompanyCountPlural() {
  const {selectMessage} = usePluralForm();
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  return useCallback((companyCount: number) => {
    // For Chinese, always use the simple format without pluralization
    if (currentLocale === 'zh-Hans') {
      return translate(
        {
          id: 'showcase.filters.resultCount',
          message: '{companyCount} 家公司',
        },
        {companyCount},
      );
    }
    
    // For English and other languages with plural forms
    return selectMessage(
      companyCount,
      translate(
        {
          id: 'showcase.filters.resultCount',
          description:
            'Pluralized label for the number of companies found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: '1 company|{companyCount} companies',
        },
        {companyCount},
      ),
    );
  }, [currentLocale, selectMessage]);
} 