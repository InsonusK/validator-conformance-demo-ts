import { ValidationResult } from '../types';

export interface IdArrayValidationContext {
  isExist(id: string): boolean;
  orderNumOf(id: string): number;
}

export function validateIdArray(
  ids: string[],
  context: IdArrayValidationContext
): ValidationResult {
  if (ids.length === 0) {
    return { valid: false, errors: ['ids_required'] };
  }

  if (new Set(ids).size !== ids.length) {
    return { valid: false, errors: ['duplicate_id'] };
  }

  for (const id of ids) {
    if (!context.isExist(id)) {
      return { valid: false, errors: ['id_not_found'] };
    }
  }

  for (let i = 1; i < ids.length; i += 1) {
    if (context.orderNumOf(ids[i - 1]) >= context.orderNumOf(ids[i])) {
      return { valid: false, errors: ['ids_not_ordered'] };
    }
  }

  return { valid: true, errors: [] };
}
