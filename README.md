# prisma-instrumentation-test

## Setup
You must have Docker running in the background.

1. `npm install`
2. `npm run pg:create`
3. `npm run migrate`
4. `npm run dev`

## Routes
* GET `/users` => returns all users
* POST `/createUser` => creates a user, expects a JSON in the following format:
```js
{
  firstName: string;
  lastName: string;
  funFacts: Array<string>;
}
```