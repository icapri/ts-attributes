import { CreditCardType, creditCardNumber } from '..';

class User {
  @creditCardNumber(CreditCardType.AmericanExpress)
  cc5?: number = 378282246310005;
  @creditCardNumber(CreditCardType.AmericanExpress)
  cc6: string = '371449635398431';

  @creditCardNumber(CreditCardType.MasterCard)
  cc7: string = '5105-1051-0510-5100';
  @creditCardNumber(CreditCardType.MasterCard)
  cc8: string = '5105-10510510-5100';
  @creditCardNumber(CreditCardType.MasterCard)
  cc1?: number = 5555555555554444;
  @creditCardNumber(CreditCardType.MasterCard)
  cc2: string | number | null | undefined = '5105 1051 0510 5100';
  @creditCardNumber(CreditCardType.MasterCard)
  cc3: string | number | null | undefined = '5105-1051-0510-5100';
  @creditCardNumber(CreditCardType.MasterCard)
  cc4: string | number | null | undefined = '5105-10510510-5100';

  @creditCardNumber(CreditCardType.DinersClub)
  cc9?: number = 30569309025904;
  @creditCardNumber(CreditCardType.DinersClub)
  cc10: string = '38520000023237';

  @creditCardNumber(CreditCardType.Discover)
  cc11: string = '6011111111111117';
  @creditCardNumber(CreditCardType.Discover)
  cc12: string = '6011000990139424';

  @creditCardNumber(CreditCardType.JCB)
  cc13: string = '3530111333300000';
  @creditCardNumber(CreditCardType.JCB)
  cc14: string = '3566002020360505';

  @creditCardNumber(CreditCardType.Visa)
  cc15: string = '4111111111111111';
  @creditCardNumber(CreditCardType.Visa)
  cc16: string = '4012888888881881';
  @creditCardNumber(CreditCardType.Visa)
  cc17: string = '4222222222222';
}

test('creditCardNumber() Decorator', () => {
  const account = new User();
  expect(account.cc1).toBe(5555555555554444);
  expect(account.cc2).toBe('5105105105105100');
  expect(account.cc3).toBe('5105105105105100');
  expect(account.cc4).toBe('5105105105105100');
  expect(account.cc5).toBe(378282246310005);
  expect(account.cc6).toBe('371449635398431');

  expect(account.cc7).toBe('5105105105105100');
  expect(account.cc8).toBe('5105105105105100');
  expect(account.cc9).toBe(30569309025904);
  expect(account.cc10).toBe('38520000023237');
  expect(account.cc11).toBe('6011111111111117');
  expect(account.cc12).toBe('6011000990139424');

  expect(account.cc13).toBe('3530111333300000');
  expect(account.cc14).toBe('3566002020360505');
  expect(account.cc15).toBe('4111111111111111');
  expect(account.cc16).toBe('4012888888881881');
  expect(account.cc17).toBe('4222222222222');
});
