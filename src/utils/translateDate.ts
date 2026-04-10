import {translate} from '@docusaurus/Translate';

const MONTH_TRANSLATIONS: Record<string, { id: string; message: string }> = {
  January: { id: 'date.month.january', message: 'January' },
  February: { id: 'date.month.february', message: 'February' },
  March: { id: 'date.month.march', message: 'March' },
  April: { id: 'date.month.april', message: 'April' },
  May: { id: 'date.month.may', message: 'May' },
  June: { id: 'date.month.june', message: 'June' },
  July: { id: 'date.month.july', message: 'July' },
  August: { id: 'date.month.august', message: 'August' },
  September: { id: 'date.month.september', message: 'September' },
  October: { id: 'date.month.october', message: 'October' },
  November: { id: 'date.month.november', message: 'November' },
  December: { id: 'date.month.december', message: 'December' },
};

/**
 * Translates a date string like "May 30" or "February 19" to the current locale.
 */
export function translateDate(dateStr: string): string {
  for (const [eng, t] of Object.entries(MONTH_TRANSLATIONS)) {
    if (dateStr.includes(eng)) {
      const translated = translate(t);
      return dateStr.replace(eng, translated);
    }
  }
  return dateStr;
}
