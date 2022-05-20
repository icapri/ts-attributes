import { Validator } from '../core/validators';
import { negativeInteger } from '../index';

class DebtPayer {
  @negativeInteger()
  debt: number = -55;
}

test('negativeInteger() Decorator', () => {
  const debtPayer = new DebtPayer();
  expect(Validator.isInteger('Sdc')).toBe(false);
  expect(Validator.isInteger(5)).toBe(true);
  expect(debtPayer.debt).toEqual(-55);
});
