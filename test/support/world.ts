import { setWorldConstructor, World } from '@cucumber/cucumber';
import { ValidationResult } from '../../src/types';

interface IdContextEntry {
  exists: boolean;
  orderNum?: number;
}

export class CustomWorld extends World {
  result?: ValidationResult;
  balances = new Map<string, number>();
  idContext = new Map<string, IdContextEntry>();
}

setWorldConstructor(CustomWorld);
