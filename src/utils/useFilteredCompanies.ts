import {useMemo} from 'react';
import {sortedCompanies, type TagType, type Company} from '../data/femtech-companies';
import {useQueryString, useQueryStringList} from '@docusaurus/theme-common';

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
  const toggleOperator = () => {
    const newOperator = operator === 'OR' ? 'AND' : null;
    setSearchOperator(newOperator);
  };
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
  if (searchName) {
    // Filter by name
    companies = companies.filter((company) =>
      company.title.toLowerCase().includes(searchName.toLowerCase()) ||
      (company.description && company.description.toLowerCase().includes(searchName.toLowerCase()))
    );
  }
  
  if (tags.length === 0) {
    return companies;
  }
  
  // Filter by tags
  return companies.filter((company) => {
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