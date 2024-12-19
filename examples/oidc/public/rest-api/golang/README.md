# GO Rest API

This is an example for authenticating tokens received from a public SPA in a golang server.

## Getting Started

- Copy `.env.example` to a new file `.env`, and update values as needed. The provided realm URI example is for a standard client in the dev environment. Replace the `AUDIENCE` variable with your client id.
- Run `go run .` to run the server.

This server can be used in combination with the [React](../../react) or [Vue](../../vue) examples to test tokens from client-side applications. Run the SPA application example in another terminal to test them together.

### Hot reloading

You can use [air](https://github.com/air-verse/air) for live reloading if desired. 

- **Install**: go install github.com/air-verse/air@latest
- **Run**: air --build.cmd "go build" --build.bin "./rest-api"

## Token Validation

To ensure token validity in your API, you must:

- Validate the signature with the public keys available from the keycloak server. 
- Validate the token is not expired.
- Validate additional claims, such as the issuer and audience.

This repository uses [Hashicorp's jwt library](https://pkg.go.dev/github.com/hashicorp/cap/jwt) to manage the public keyset fetching/caching and token validation. See the [verify function](./verify.go#L15) for details.
