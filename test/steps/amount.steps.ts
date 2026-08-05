import { Given, When } from '@cucumber/cucumber';
import { validateAmount, AmountValidationContext } from '../../src/validators/amount-validator';
import { CustomWorld } from '../support/world';

Given(
  'баланс счёта {string} равен {int}',
  function (this: CustomWorld, accountId: string, balance: number) {
    this.balances.set(accountId, balance);
  }
);

When(
  'проверяется сумма {int} для счёта {string}',
  function (this: CustomWorld, amount: number, accountId: string) {
    const context: AmountValidationContext = {
      getBalanceOf: (id: string) => this.balances.get(id) ?? 0,
    };
    this.result = validateAmount(accountId, amount, context);
  }
);
