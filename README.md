# About

![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)

This repository contains example applications to demonstrate integrating with keycloak.

To use the examples in the app, you will need to have a keycloak client setup to integrate with.
If you are using keycloak to integrate with a new application you will be building, you can
use our our self-service [webapp](https://bcgov.github.io/sso-requests/) to create a new client.

## Examples

[Demonstration of using example apps](https://user-images.githubusercontent.com/37274633/136239765-97cf3c91-eb22-4f42-b682-b4cb0e619cfc.mp4)

### public-nextjs

This is an example application setup to use a frontend single-page application(SPA)
with a backend API. To run this example, you will need a public keycloak client you can use.
Copy the installation JSON for your client into `public/keycloak.json`. To run locally
ensure that your client allows `http://localhost:3000` as a valid
redirect URI. Then from `examples/nextjs-example`:

- **Build Image**: `docker build -t kc-demo .`
- **Run Image**: `docker run -p 3000:3000 kc-demo`

Visit `localhost:3000` on your machine to test it out.

### Confidential-express

This is an example express app with a confidential client. To run this example,
you will need a confidential keycloak client you can use. If you have generated one with
our self-service [webapp](https://bcgov.github.io/sso-requests/), copy the
installation json you receive into `keycloak.json`. To run locally
ensure that your client allows `http://localhost:3000` as a valid
redirect URI. Then from `examples/nextjs-example`:

- **Build Image**: `docker build -t kc-demo .`
- **Run Image**: `docker run -p 3000:3000 kc-demo`

Visit `localhost:3000` on your machine to test it out.

### public-fastAPI

An example python API written in fastAPI, with a vuejs SPA frontend. The fastAPI backend
uses [pyjwt](https://pyjwt.readthedocs.io/en/latest/) as an example of fetching the
json web key from the `.well-known` endpoint and using it to verify a tokens signature.

To run this example, you will need a public keycloak client you can use. If you have generated one with
our self-service [webapp](https://bcgov.github.io/sso-requests/), copy the
installation json you receive into `services/frontend/public/keycloak.json`. To run locally
ensure that your client allows `http://localhost:3000` as a valid
redirect URI. Then from `examples/nextjs-example`:

- **Run**: `docker-compose up`

Visit `localhost:3000` on your machine to test it out.
