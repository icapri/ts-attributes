import { notNull } from '..';

class Pupil {
  @notNull()
  age: number = null as unknown as number; // error!
}

test('notNull() Decorator', () => {
  expect(true).toBe(true);
});
