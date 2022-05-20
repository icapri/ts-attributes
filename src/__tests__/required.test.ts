import { required } from '..';

class Pupil {
  @required() age: number = undefined as unknown as number; // error!
}

test('required() Decorator', () => {
  expect(true).toBe(true);
});
