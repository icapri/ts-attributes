import { segment } from '..';

class X {
  @segment(-1, 2, false)
  x: number = 1.9; // error!
}

test('segment() Decorator', () => {
  const x = new X();
  expect(x.x).toBe(1.9);
});
