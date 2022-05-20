import { Country, iban } from '..';

class BankAccount {
  @iban(Country.Albania)
  iban: string = 'AL35202111090000000001234567';

  @iban(Country.Germany)
  ibanDe: string = 'DE75512108001245126199';

  @iban(Country.Germany)
  ibanDeFormatted: string = 'DE75 5121 0800 1245 1261 99';

  @iban(Country.Germany)
  ibanLower: string = 'dE75 5121 0800 1245 1261 99sdcsdcsdcsdc';

  @iban(Country.Albania)
  ibanTrash: string = 'AL35202111090000000001234567sometrashatend';
}

test('iban() Decorator', () => {
  const account = new BankAccount();
  expect(account.iban).toBe('AL35202111090000000001234567');
  expect(account.ibanTrash).toBe('AL35202111090000000001234567');
  expect(account.ibanDe).toBe('DE75512108001245126199');
  expect(account.ibanDeFormatted).toBe('DE75512108001245126199');
  expect(account.ibanLower).toBe('DE75512108001245126199');
});
