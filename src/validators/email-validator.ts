import { ValidationResult } from '../types';

const EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  if (!email) {
    errors.push('email_required');
    return { valid: false, errors };
  }

  if (!EMAIL_REGEX.test(email)) {
    errors.push('invalid_email_format');
  }

  return { valid: errors.length === 0, errors };
}
