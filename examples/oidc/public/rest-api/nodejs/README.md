# GO Rest API

This is an example for authenticating tokens received from a public SPA in a nodejs server.

## Getting Started

- Copy `.env.example` to a new file `.env`, and update values as needed. The provided realm URI example is for a standard client in the dev environment. Replace the `AUDIENCE` variable with your client id.
- Run `yarn` to install dependencies.
- Run `yarn dev` to start the app.

This server can be used in combination with the [React](../../react) or [Vue](../../vue) examples to test tokens from client-side applications. Run the SPA application example in another terminal to test them together.

## Token Validation

To ensure token validity in your API, you must:

- Validate the signature with the public keys available from the keycloak server. 
- Validate the token is not expired.
- Validate additional claims, such as the issuer and audience.

This repository uses [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) to manage the public keyset fetching/caching, and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for the token validation. See the [verify function](./verify.js#L10) for details.
