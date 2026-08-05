import { When } from '@cucumber/cucumber';
import { validateEmail } from '../../src/validators/email-validator';
import { CustomWorld } from '../support/world';

When('проверяется email {string}', function (this: CustomWorld, email: string) {
  this.result = validateEmail(email);
});
