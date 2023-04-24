# SSO Pathfinder Rolebased Client Using Node-Express

## Description

This is an example backend app that authenticates users using OAuth 2.0 standard flow, and helps the user to check their roles

## Getting Started

## Pre-requisites

- You require an integration with client type `confidential` before you can start using this example app
- Navigate to [SSO Onboarding](https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding) to know more about creating an integration

## Installing

- Update below required values and add them to a `.env` file and save it in project directory

  ```sh
  SSO_SESSION_SECRET=
  SSO_AUTH_SERVER_URL=https://dev.loginproxy.gov.bc.ca/auth
  SSO_REALM=standard
  SSO_CLIENT_ID=
  SSO_CLIENT_SECRET=
  SSO_LOGOUT_REDIRECT_URI=http://localhost:3000
  ```

In the project directory, you can run `yarn` command:

### `yarn install`

Installs dependencies from `package.json`

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
