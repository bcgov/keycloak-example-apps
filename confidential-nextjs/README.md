# Nextjs Confidential

This repository is a demonstration of using a nextjs application with a confidential client
and some helper repositories for working with keycloak. It takes advantage of:

- **[sso-express](https://github.com/bcgov/cas-template-app/tree/develop/packages/sso-express)**: Utility used with express to handle refreshing sessions
- **[sso-react](https://www.npmjs.com/package/@bcgov-cas/sso-react)**: Frontend module for session refreshing.

## Getting started

You will need a confidential keycloak client that accepts redirects to `localhost:3000`. Add the installation JSON into
`server/index.js` to get connected.

To run the app locally, run `yarn dev`. 