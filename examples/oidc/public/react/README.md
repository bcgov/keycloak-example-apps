# SSO Pathfinder Public Client Using React

## Description

This is an example react app that authenticates users using OpenID-Connect standard flow with PKCE

## Getting Started

## Pre-requisites

- You require an integration before you can start using this example app.
- Navigate to [SSO Onboarding Guide](https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding) to learn more about creating an integration.
- When creating the integration request add `http://localhost:5173/*` to the list of valid redirect URIs for your integration if using the default port. Update the port as appropriate if using a different one locally.
- Once you've successfully set up an integration via the CSS app, select your integration in the dashboard and access the `Technical Details` tab. From there, simply choose the desired environment (Development, Test, or Production) and click the corresponding button to download a JSON file containing your integration details.

## Installing

- Copy and update the below values to a `.env` file in the project directory and save it.

  ```sh
  VITE_SSO_REDIRECT_URI=http://localhost:5173
  VITE_SSO_AUTH_SERVER_URL=https://dev.loginproxy.gov.bc.ca/auth
  VITE_SSO_REALM=standard
  VITE_SSO_CLIENT_ID=<resource value from JSON>
  ```

- If you want to run this alongside one of the rest API examples, also include an env var for the API (API examples run on 8080 by default):
  ```sh
  VITE_SERVER_URI=http://localhost:8080
  ```

In the project directory, you can run either `yarn` or `npm` commands:

### `yarn install` or `npm install`

Installs dependencies from `package.json`

### `yarn dev` or `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.
