import { date, readOnly } from '../index';

class Visitor {
  @readOnly()
  id: string = 'somevalue';
}

test('readOnly() Decorator', () => {
  const visitor = new Visitor();
  expect(visitor.id).toBe('somevalue');
});
