# SSO Pathfinder Public Client Using React

## Description

This is an example react app that authenticates users using OAuth 2.0 standard flow with PKCE

## Getting Started

## Pre-requisites

- You require an integration before you can start using this example app
- Navigate to [SSO Onboarding](https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding) to know more about creating an integration

## Installing

- Update below required values and add them to a `.env` file and save it in project directory

  ```sh
  REACT_APP_SSO_REDIRECT_URI=http://localhost:3000
  REACT_APP_SSO_AUTH_SERVER_URL=https://dev.loginproxy.gov.bc.ca/auth
  REACT_APP_SSO_REALM=standard
  REACT_APP_SSO_CLIENT_ID=<UPDATE>
  ```

In the project directory, you can run either `yarn` or `npm` commands:

### `yarn install` or `npm install`

Installs dependencies from `package.json`

### `yarn start` or `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
