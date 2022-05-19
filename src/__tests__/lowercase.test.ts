import { lowercase } from '../index';

class Person {
  @lowercase()
  nickname: string = 'JoHn dOE';
}

test('lowercase() Decorator', () => {
  const person = new Person();
  expect(person.nickname).toBe('john doe');
});
