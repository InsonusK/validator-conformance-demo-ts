import { When } from '@cucumber/cucumber';
import { validateDateRange } from '../../src/validators/date-range-validator';
import { CustomWorld } from '../support/world';

When(
  'проверяется диапазон с датой {string} по дату {string}',
  function (this: CustomWorld, dateFrom: string, dateTo: string) {
    this.result = validateDateRange(dateFrom, dateTo);
  }
);
