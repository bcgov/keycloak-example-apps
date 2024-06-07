# SSO Pathfinder Public Digital Credential Client Using React

## Description

This is an example react app that authenticates users using OAuth 2.0 standard flow with PKCE, with DC integration. It is identical to the none-DC integration with one exception, the login redirect url has one aditional environment variable passed in. See the `keycloak-example-apps/examples/oidc/public-dc/react/src/services/keycloak.js` file.

## Getting Started

## Pre-requisites

Currently, Digital Credential (DC) is available in our standard service offering in our [CSS App](https://bcgov.github.io/sso-requests)

This example specifically uses the showcase demo, Digital Credential. Creating a different one will require reaching out to the DC team.

- You require an integration before you can start using this example app
- Navigate to [SSO Onboarding Guide](https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding) to know more about creating an integration
- Create an integration with DC as one of the selected IDPs
- When creating the integration request add `http://localhost:3000/*` to the list of valid redirect URIs for your integration.
- Install the BC Wallet on your mobile device [Demo Instructions](https://digital.gov.bc.ca/digital-trust/showcase/demo)
- This example should only be used in Dev/Test when testing:
   - At the time of writing this update, please use the `sso-pathfinder-1` credential for dev/test. Please reach out the the DC team -ditrust@gov.bc.ca- to get your working credential in your wallet
   - By September 2024 we anticipate you can use the the `showcase-demo` credential where you add the `Joyce person credential` to your BC Wallet. Please read [here](https://digital.gov.bc.ca/digital-trust/showcase/demo)
- **stay tuned as the DC team provides a link to additional material**

Note: the redirect uri for your integration must match that of the example app you are running. For a local deployment that would be `http://localhost:3000/*`.

## Installing

- Copy and update the below values to a `.env` file and save it in the project directory. A `.env-example` file it there and can be copied and renamed.

```sh
REACT_APP_SSO_REDIRECT_URI=http://localhost:3000
REACT_APP_SSO_AUTH_SERVER_URL=https://dev.sandbox.loginproxy.gov.bc.ca/auth
REACT_APP_SSO_REALM=standard
REACT_APP_SSO_CLIENT_ID=<resource value from JSON>
REACT_APP_PRES_REQ_CONF_ID=sso-pathfinder-1
REACT_APP_SITEMINDER_LOGOUT=https://logon7.gov.bc.ca/clp-cgi/logoff.cgi
```

In the project directory, you can run either `yarn` or `npm` commands:

### `yarn install` or `npm install`

Installs dependencies from `package.json`

### `yarn start` or `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
