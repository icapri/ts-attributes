import { lowerFirst } from '../index';

class User {
  @lowerFirst()
  hobby: string = 'Guitar';
}

test('lowerFirst() Decorator', () => {
  const user = new User();
  expect(user.hobby).toBe('guitar');
});
