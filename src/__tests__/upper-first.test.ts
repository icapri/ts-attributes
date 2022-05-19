import { upperFirst } from '../index';

class User {
  @upperFirst()
  firstName: string = 'johnny';
}

test('upperFirst() Decorator', () => {
  const user = new User();
  expect(user.firstName).toBe('Johnny');
});
