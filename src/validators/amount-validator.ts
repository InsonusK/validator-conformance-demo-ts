import { ValidationResult } from '../types';

export interface AmountValidationContext {
  getBalanceOf(accountId: string): number;
}

export function validateAmount(
  accountId: string,
  amount: number,
  context: AmountValidationContext
): ValidationResult {
  const errors: string[] = [];

  if (amount <= 0) {
    errors.push('amount_must_be_positive');
  } else if (amount > context.getBalanceOf(accountId)) {
    errors.push('insufficient_funds');
  }

  return { valid: errors.length === 0, errors };
}
