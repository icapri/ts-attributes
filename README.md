# TS Attributes

This package provides helpful property decorators which can be used expecially for view model validation or for decorating the properties of the DTOs. This package is the best tool to use for making a property non-writable, for making sure that an object property receives only values of a given type and withing some defined boundaries, and much more.

E. g.:

```typescript
export class UserDto {
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

- `date()` Checks whether the property to which this decorator is applied is a valid date object; otherwise an error is thrown at compile time.

_Example:_
```typescript
export class User {
  @date()
  created: Date = new Date('blahblah'); // error!
}
```

- `email()` Checks whether the value of the property is a string which represents a valid email address. If the string is not a valid email address an error is thrown at compile time.

_Example:_
```typescript
export class Customer {
  @email()
  emailAddress: string = 'someinvalidemail.com'; // error!
}
```

- `float(decimals: number)` Rounds a decimal number to the given number of decimal digits.

_Example:_
```typescript
export class BankAccount {
  @float(2)
  balance: number = 56848.6699; // value: 56848.67
}
```

- `integer()` Checks whether the value of a property is an integer; otherwise throws an error.

_Example:_
```typescript
export class Person {
  @integer()
  age: number = -55; // error!
}
```

- `interval(from: Date, to: Date)` Checks whether the value of the property is within the determined segment.

_Example:_
```typescript
export class Citizen {
  @interval(new Date('1995-12-17T03:24:00'), new Date())
  dateOfBirth: Date = new Date('1991-12-17'); // error!
}
```

- `key()` Checks whether the property fulfills the criteria for being a primary key property i. e. is a required property and its value can only be read.

_Example:_
```typescript
export class ClientDto {
  @key()
  id: string = undefined as unknown as string; // error!
}
```