# TS Attributes

This package provides a vast variety of TypeScript decorators of high importance. These decorators make sure that only valid values are considered but some of them do also make conversions like converting a string to upper-case or unharmful "refinements" of the input values like removing harmful characters from strings, removing unnecessary characters from them and more on.

Before enjoying the functionalities offered by this package please make sure that the node `"experimentalDecorators"` inside the `"compilerOptions"` of your `tsconfig.json` file is set to `true` as follows:

```typescript
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "experimentalDecorators": true   
  }
}
```

##API Documentation

### Property Decorators

- **`creditCardNumber(accepts: CreditCardType | CreditCardType[] | 'all')`**
Makes sure that the value of the property is a valid credit card number. This method also refines the value of the property in case the credit card number is a string like `5105-1051-0510-5100`. In this case the '-' characters are removed from the string for convenience. Defaults to `all`.

_Example:_
```typescript
class Account {
  @creditCardNumber() creditCardNr: string = '4111111111111111'; // correct!
}
```

- **`date()`** Makes sure that the property to which this decorator is applied is a valid date object; otherwise throws.

_Example:_
```typescript
class User {
  @date() created: Date = new Date('blahblah'); // error!
}
```

- **`email()`** Makes sure that the value of the property is a string which represents a valid email address; otherwise throws.

_Example:_
```typescript
class Customer {
  @email() emailAddress: string = 'someinvalidemail.com'; // error!
}
```

- **`escape()`** Removes or replaces illegal characters of the string value of the given property.

_Example:_
```typescript
class Link {
  @escape()
  url: string = `<script src="some/source.js">var & @+?</script>`;
  // %26lt;script src=%26quot;some%2Fsource.js%26quot;%26gt;var %26amp; @%2B%3F%26lt;%2Fscript%26gt;
}
```

- **`float(decimals: number)`** Rounds a decimal number to the given number of decimal digits.

_Example:_
```typescript
class BankAccount {
  @float(2) balance: number = 56.669; // value: 56.67
}
```

- **`iban(accepts: Country | Country[] | 'all')`** Makes suret that the string value of the given property is a valid IBAN; otherwise throws. Defaults to `all`.

_Example:_
```typescript
class Account {
  @iban() iban: string = 'DE75 5121 0800 1245 1261 99'; // correct!
}
```

- **`integer()`** Makes sure that the value of a property is an integer; otherwise throws.

_Example:_
```typescript
class Person {
  @integer() age: number = -1.1; // error!
}
```

- **`interval(from: Date, to: Date)`** Makes sure that the value of the given property is within the determined time interval.

_Example:_
```typescript
class Citizen {
  @interval(new Date('1995-12-17'), new Date())
  born: Date = new Date('1991-12-17'); // error!
}
```

- **`key()`** Makes sure that the property fulfills the criteria for being a key i. e. is a required property and its value is read-only.

_Example:_
```typescript
class ClientDto {
  @key() id: string = undefined as unknown as string; // error!
}
```

- **`lowerFirst()`** Converts the first character of the value of the string property to lower case.

_Example:_
```typescript
class Student {
  @lowerFirst() hobby: string = 'Guitar'; // guitar
}
```

- **`lowercase()`** Converts the value of a property of type string to lower case.

_Example:_
```typescript
class Applicant {
  @lowercase() note: string = 'bLaH BlAh'; // blah blah
}
```

- **`negativeInteger()`** Makes sure that the value of the given property is a negative integer.

_Example:_
```typescript
class X {
  @negativeInteger() x: number = 1; // error!
}
```

- **`notNull()`** Makes sure that the property has a value other than `null` set; otherwise throws.

_Example:_
```typescript
class Pupil {
  @notNull() age: number = null as unknown as number; // error!
}
```

- **`positiveInteger()`** Makes sure that the value of the property is a positive integer incl. zero.

_Example:_
```typescript
class X {
  @positiveInteger() x: number = -1; // error!
}
```

- **`readOnly()`** Makes the given property read-only.

_Example:_
```typescript
class Visitor {
  @readOnly() id: string = 'somevalue';
}

const visitor = new Visitor();
visitor.id = 'othervalue'; // error!
```

- **`required()`** Makes sure that neither `null` nor `undefined` is set as a value to the property to which this decorator is applied; otherwise throws.

_Example:_
```typescript
class Pupil {
  @required() age: number = undefined as unknown as number; // error!
}
```

- **`segment(from: number, to: number)`** Makes sure that the value of the property is within the determined segment; otherwise an error is thrown.

_Example:_
```typescript
class X {
  @segment(-1, 1) x: number = 2; // error!
}
```

- **`upperFirst()`** Capitalizes the first character of the value of the string property.

_Example:_
```typescript
class Student {
  @upperFirst() name: string = 'johnny'; // Johnny
}
```

- **`uppercase()`** Capitalizes the string value of the property to which this decorator is being applied.

_Example:_
```typescript
class Applicant {
  @uppercase() passportNo: string = 'ab1234567l'; // AB1234567L
}
```