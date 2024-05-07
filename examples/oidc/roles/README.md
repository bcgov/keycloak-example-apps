# SSO Pathfinder Rolebased Client Using Node-Express

## Description

This is an example backend app that authenticates users using OpenID-Connect standard flow and helps the user check their roles

## Getting Started

## Pre-requisites

- You require an integration with client-type `confidential` before you can start using this example app
- Navigate to SSO [Onboarding Guide](https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding) to learn more about creating an integration
- Once you've successfully set up an integration via the CSS app, select your integration on the dashboard and access the `Technical Details` tab. From there, simply choose the desired environment (Development, Test, or Production) and click the corresponding button to download a JSON file containing your integration details.

## Installation

- Copy and update the below values to a `.env` file in the project directory and save it.

  ```sh
  SSO_SESSION_SECRET=somesecret
  SSO_AUTH_SERVER_URL=https://dev.loginproxy.gov.bc.ca/auth
  SSO_REALM=standard
  SSO_CLIENT_ID=<resource value from JSON>
  SSO_CLIENT_SECRET=<credentials.secret value from JSON>
  SSO_LOGOUT_REDIRECT_URI=http://localhost:3000
  ```

In the project directory, you can run `yarn` command:

### `yarn install`

Installs dependencies from `package.json`

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
