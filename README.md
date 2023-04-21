# About

![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)

This repository contains example applications to demonstrate integrating with keycloak.

To use the examples in the app, you will need to have a keycloak client setup to integrate with.
If you are using keycloak to integrate with a new application you will be building, you can
use our our self-service [webapp](https://bcgov.github.io/sso-requests/) to create a new client.

## Examples

The `./examples` folder contains example apps that make use of public and confidential clients. As of now only OpenID connect clients are supported and all the example apps are written in javascript

### Public

We have two example apps, which are single-page applications (SPAs) written using `react` and `vue` and are placed under `./examples/oidc/public` folder. To run these example apps, you will need a public keycloak client. Each example app folder consists of a `README.md` file that enlists all the instructions to run the app

### Confidential

We have one example app written using `nodejs` and `express`, which is placed under `./examples/oidc/confidential` folder. This is a backend application that runs on a server. To run this example app, you will need a confidential keycloak client and you can find all the instructions to run the app in a `README.md` file under the example app directory
