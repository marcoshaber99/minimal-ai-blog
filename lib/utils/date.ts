/**
 * Formats a date consistently across the application
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US");
}
