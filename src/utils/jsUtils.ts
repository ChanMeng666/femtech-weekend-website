/**
 * Sort function that sorts an array based on a field accessor
 */
export function sortBy<T>(
  array: T[],
  getter: (item: T) => string | number | boolean
): T[] {
  const sortedArray = [...array];
  sortedArray.sort((a, b) => {
    const fieldA = getter(a);
    const fieldB = getter(b);
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return fieldA.localeCompare(fieldB);
    }
    
    if (fieldA === fieldB) {
      return 0;
    }
    
    return fieldA < fieldB ? -1 : 1;
  });
  return sortedArray;
} 