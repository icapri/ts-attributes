import { escape } from '../index';

class User {
  @escape()
  firstName: string = `<script src="some/source.js">var & @+?</script>`;
}

test('escape() Decorator', () => {
  const user = new User();
  expect(user.firstName).toBe(`%26lt;script src=%26quot;some%2Fsource.js%26quot;%26gt;var %26amp; @%2B%3F%26lt;%2Fscript%26gt;`);
});
