import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function format(date: string | Date, formatStr: string): string {
  const d = new Date(date);

  const map: Record<string, string> = {
    dd: String(d.getDate()).padStart(2, '0'),
    d: String(d.getDate()),
    MMM: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][d.getMonth()],
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    yyyy: String(d.getFullYear()),
    yy: String(d.getFullYear()).slice(-2),
    HH: String(d.getHours()).padStart(2, '0'),
    mm: String(d.getMinutes()).padStart(2, '0'),
    ss: String(d.getSeconds()).padStart(2, '0'),
  };

  return formatStr.replace(
    /dd|d|MMM|MM|yyyy|yy|HH|mm|ss/g,
    (match) => map[match]
  );
}
