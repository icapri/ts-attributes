# TS Attributes

This package provides helpful property decorators which can be used expecially for view model validation or for decorating the properties of the DTOs. This package is the best tool to use for making a property non-writable, for making sure that an object property receives only values of a given type and withing some defined boundaries, and much more.

E. g.:

```typescript
class UserDto {
  @readOnly()
  public id: string;

  @positiveInteger()
  public age: number;
}
```

In order for all this to work, first of all please make sure that the node `"experimentalDecorators"` inside the `"compilerOptions"` of your `tsconfig.json` file is set to `true` as follows:

```json
{
  // ...
  "compilerOptions": {
    // ...
    "experimentalDecorators": true   
  }
}
```

API Documentation

## Property Decorators

- `creditCardNumber(accepts: CreditCardType | CreditCardType[] | 'all' = 'all')` Checks whether the value of the property is a valid credit card number. This method also refines the value of the property in case the credit card number is a string like `5105-1051-0510-5100`. In this case the '-' characters are removed from the string for convenience.

_Example:_
```typescript
class Account {
  @creditCardNumber(CreditCardType.Visa) visaCardNr: string = '4111111111111111'; // correct!
}
```

- `date()` Checks whether the property to which this decorator is applied is a valid date object; otherwise an error is thrown.

_Example:_
```typescript
class User {
  @date() created: Date = new Date('blahblah'); // error!
}
```

- `email()` Checks whether the value of the property is a string which represents a valid email address. If the string is not a valid email address an error is thrown at compile time.

_Example:_
```typescript
class Customer {
  @email() emailAddress: string = 'someinvalidemail.com'; // error!
}
```

- `escape()` Removes or replaces illegal characters of the string value of the given property.

_Example:_
```typescript
class Link {
  @escape()
  url: string = `<script src="some/source.js">var & @+?</script>`;
  // %26lt;script src=%26quot;some%2Fsource.js%26quot;%26gt;var %26amp; @%2B%3F%26lt;%2Fscript%26gt;
}
```

- `float(decimals: number)` Rounds a decimal number to the given number of decimal digits.

_Example:_
```typescript
class BankAccount {
  @float(2) balance: number = 56848.6699; // value: 56848.67
}
```

- `iban(country: Country | Country[] | 'all' = 'all')` Checks whether the string value of the given property is a valid IBAN of the given country; otherwise an error is thrown.

_Example:_
```typescript
class Account {
  @iban() iban: string = 'DE75 5121 0800 1245 1261 99'; // correct!
}
```

- `integer()` Checks whether the value of a property is an integer; otherwise throws an error.

_Example:_
```typescript
class Person {
  @integer() age: number = -1.1; // error!
}
```

- `interval(from: Date, to: Date)` Checks whether the value of the property is within the determined time interval.

_Example:_
```typescript
class Citizen {
  @interval(new Date('1995-12-17'), new Date()) dateOfBirth: Date = new Date('1991-12-17'); // error!
}
```

- `key()` Checks whether the property fulfills the criteria for being a primary key property i. e. is a required property and its value is read-only.

_Example:_
```typescript
class ClientDto {
  @key() id: string = undefined as unknown as string; // error!
}
```

- `lowerFirst()` Converts the first character of the value of the string property to lower case.

_Example:_
```typescript
class Student {
  @lowerFirst() hobby: string = 'Guitar'; // guitar
}
```

- `lowercase()` Converts the value of a property of type string to lower case.

_Example:_
```typescript
class Applicant {
  @lowercase() note: string = 'bLaH BlAh'; // blah blah
}
```

- `negativeInteger()` Checks whether the value of the property is a negative integer.

_Example:_
```typescript
class X {
  @negativeInteger() x: number = 1; // error!
}
```

- `notNull()` Checks whether the property has a value other than `null` set; otherwise throws.

_Example:_
```typescript
class Pupil {
  @notNull() age: number = null as unknown as number; // error!
}
```

- `positiveInteger()` Checks whether the value of the property is a positive integer including zero.

_Example:_
```typescript
class X {
  @positiveInteger() x: number = -1; // error!
}
```

- `readOnly()` Makes the given property read-only.

_Example:_
```typescript
class Visitor {
  @readOnly() id: string = 'somevalue';
}

const visitor = new Visitor();
visitor.id = 'othervalue'; // error!
```

- `required()` Checks whether the property has a value other than `null` or `undefined` set; otherwise throws.

_Example:_
```typescript
class Pupil {
  @required() age: number = undefined as unknown as number; // error!
}
```

- `segment(from: number, to: number)` Checks whether the value of the property is within the determined segment.

_Example:_
```typescript
class X {
  @segment(-1, 1) x: number = 2; // error!
}
```

- `upperFirst()` Capitalizes the first character of the value of the string property.

_Example:_
```typescript
class Student {
  @upperFirst() name: string = 'johnny'; // Johnny
}
```

- `uppercase()` Capitalizes the string value of the property to which this decorator is being applied.

_Example:_
```typescript
class Applicant {
  @uppercase() passportNo: string = 'ab1234567l'; // AB1234567L
}
```