import { format, parseISO, isValid } from 'date-fns';
import { vi } from 'date-fns/locale';

export function formatDate(dateStr: string, formatStr = 'dd/MM/yyyy'): string {
  if (!dateStr) return '';
  const d = parseISO(dateStr);
  return isValid(d) ? format(d, formatStr, { locale: vi }) : dateStr;
}

export function formatDateTime(dateStr: string): string {
  return formatDate(dateStr, 'dd/MM/yyyy HH:mm');
}

export function formatTime(timeStr: string): string {
  if (!timeStr) return '';
  if (timeStr.includes('T')) {
    return formatDateTime(timeStr);
  }
  const [h, m] = timeStr.split(':');
  return `${h}:${m}`;
}

export function formatDateRange(startStr: string, endStr: string): string {
  return `${formatDate(startStr)} - ${formatDate(endStr)}`;
}

export function formatSlotTime(startTime: string, endTime: string): string {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

export function toISODateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function toISODateTimeString(date: Date): string {
  return date.toISOString();
}
