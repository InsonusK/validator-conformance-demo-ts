import { ValidationResult } from '../types';

const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function parseDate(value: string): Date | null {
  if (!DATE_FORMAT_REGEX.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function validateDateRange(dateFrom: string, dateTo: string): ValidationResult {
  const errors: string[] = [];
  let parsedFrom: Date | null = null;
  let parsedTo: Date | null = null;

  if (!dateFrom) {
    errors.push('date_from_required');
  } else {
    parsedFrom = parseDate(dateFrom);
    if (!parsedFrom) {
      errors.push('invalid_date_format');
    }
  }

  if (!dateTo) {
    errors.push('date_to_required');
  } else {
    parsedTo = parseDate(dateTo);
    if (!parsedTo) {
      errors.push('invalid_date_format');
    }
  }

  if (parsedFrom && parsedTo && parsedFrom.getTime() > parsedTo.getTime()) {
    errors.push('date_from_after_date_to');
  }

  return { valid: errors.length === 0, errors };
}
