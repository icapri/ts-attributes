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