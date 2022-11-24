# SSO Pathfinder Public Client Using Vue

## Description

This is an example vue app that authenticates users using OAuth 2.0 standard flow with PKCE

## Getting Started

## Pre-requisites

- You require an integration before you can start using this example app
- Navigate to [SSO Onboarding](https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding) to know more about creating an integration

## Installing

- Update below required values and add them to a `.env` file and save it in project directory

  ```sh
  VITE_SSO_REDIRECT_URI=http://localhost:5173
  VITE_SSO_AUTH_SERVER_URL=https://dev.loginproxy.gov.bc.ca/auth
  VITE_SSO_REALM=standard
  VITE_SSO_CLIENT_ID=<UPDATE>
  ```

In the project directory, you can run either `yarn` or `npm` commands:

### `yarn build` or `npm run build`

Compiles and Minifies for Production

### `yarn install` or `npm install`

Installs dependencies from `package.json`

### `yarn dev` or `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.
