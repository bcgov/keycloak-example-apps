# SSO Pathfinder Public Digital Credential Client Using React

## Description

This is an example react app that authenticates users using OAuth 2.0 standard flow with PKCE, with DC integration.  It is identical to the none-DC integration with one exception, the login redirect url has one aditional environment variable passed in. See the `keycloak-example-apps/examples/oidc/public-dc/react/src/services/keycloak.js` file.

## Getting Started

## Pre-requisites

Currently DC is only available in the [Sandbox CSS](https://bcgov.github.io/sso-requests-sandbox) offering, production CSS DC integration coming soon.  

This example specifically uses the verified-email, Digital Credential.  Creating a different one will require reaching out to the DC team.

- You require an integration before you can start using this example app
- Navigate to [SSO Onboarding](https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding) to know more about creating an integration
- Create an integration with DC as one of the selected IDPs
- Install the BC Wallet on your mobile device [Demo Instructions](https://github.com/bcgov/vc-authn-oidc/blob/main/docs/DemoInstructions.md)
- This example should only be used in Dev/Test when testing.
- Must ensure the email address you are testing with is registered with this [email verification service](https://email-verification.vonx.io/)

Note: the redirect uri for your integration must match that of the example app you are running.  For a local deployment that would be `http://localhost:3000/*`.

## Installing

- Update below required values and add them to a `.env` file and save it in project directory. A `.env-example` file it there and can be copied and renamed.

  ```sh
  REACT_APP_SSO_REDIRECT_URI=http://localhost:3000
  REACT_APP_SSO_AUTH_SERVER_URL=https://dev.sandbox.loginproxy.gov.bc.ca/auth
  REACT_APP_SSO_REALM=standard
  REACT_APP_SSO_CLIENT_ID=
  REACT_APP_PRES_REQ_CONF_ID=verified-email
  REACT_APP_SITEMINDER_LOGOUT=https://logon7.gov.bc.ca/clp-cgi/logoff.cgi
  ```

In the project directory, you can run either `yarn` or `npm` commands:

### `yarn install` or `npm install`

Installs dependencies from `package.json`

### `yarn start` or `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
