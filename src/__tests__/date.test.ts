import { date } from '../index';

class User {
  @date()
  created: Date | null = new Date();
}

test('date() Decorator', () => {
  const account = new User();
  expect(account.created).toBeDefined();
});
