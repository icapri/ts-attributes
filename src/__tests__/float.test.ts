import { float } from '../index';

class BankAccount {
  @float(2)
  balance: number = 55.559;

  @float(1)
  debt: number = 56;
}

test('float() Decorator', () => {
  const account = new BankAccount();
  expect(account.balance).toBe(55.56);
  expect(account.debt).toBe(56);
});
