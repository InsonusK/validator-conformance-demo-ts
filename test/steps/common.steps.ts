import { Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { CustomWorld } from '../support/world';

Then(/^результат валидности: (true|false)$/, function (this: CustomWorld, expected: string) {
  assert.equal(this.result?.valid, expected === 'true');
});

Then('список ошибок: {string}', function (this: CustomWorld, expected: string) {
  assert.equal((this.result?.errors ?? []).join(','), expected);
});
