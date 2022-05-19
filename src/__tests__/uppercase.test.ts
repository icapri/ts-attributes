import { uppercase } from '../index';

class User {
  @uppercase()
  passportNo: string = 'ab1234567l';
}

test('uppercase() Decorator', () => {
  const user = new User();
  expect(user.passportNo).toBe('AB1234567L');
});
