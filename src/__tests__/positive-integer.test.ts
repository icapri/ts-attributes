import { positiveInteger } from '../index';

class DebtPayer {
  @positiveInteger()
  debt: number = 55;
}

test('positiveInteger() Decorator', () => {
  const debtPayer = new DebtPayer();
  expect(debtPayer.debt).toEqual(55);
});
