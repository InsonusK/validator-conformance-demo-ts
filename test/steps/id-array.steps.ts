import { DataTable, Given, When } from '@cucumber/cucumber';
import {
  validateIdArray,
  IdArrayValidationContext,
} from '../../src/validators/id-array-validator';
import { CustomWorld } from '../support/world';

Given(
  'в контексте определены идентификаторы:',
  function (this: CustomWorld, dataTable: DataTable) {
    for (const row of dataTable.hashes()) {
      this.idContext.set(row.id, {
        exists: row.exists === 'true',
        orderNum: row.orderNum ? Number(row.orderNum) : undefined,
      });
    }
  }
);

When('проверяется массив идентификаторов {string}', function (this: CustomWorld, ids: string) {
  const idArray = ids ? ids.split(',') : [];
  const context: IdArrayValidationContext = {
    isExist: (id: string) => this.idContext.get(id)?.exists ?? false,
    orderNumOf: (id: string) => this.idContext.get(id)?.orderNum ?? Number.POSITIVE_INFINITY,
  };
  this.result = validateIdArray(idArray, context);
});
