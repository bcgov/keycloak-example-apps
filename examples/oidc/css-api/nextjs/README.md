# Service Account with Nextjs App

This folder contains an example application using the CSS API, built with nextjs.

## Getting Started

### Prerequisites

Ensure to have npm and nodejs installed, with a version of node >= 18.0.0.

### Environment variable configuration

To run this demo, you will require a CSS API account. From the CSS Application, navigate to to **My Dashboard**, and select the **My Teams** tab. If you do not have a team, you can create one. Once you have a team, select the CSS API Account tab below and create an API account.

**Note**: _While not required, you may want to add an integration or two to the team to be able to see them in the demo application._

With the created account you can now click the download icon to get your credentials. Copy them into a .env file, following [.env.example](./.env.example), adding the values from the downloaded json as below:

```
SSO_CLIENT_ID=<clientId>
SSO_CLIENT_SECRET=<clientSecret>
SSO_TOKEN_URL=<tokenUrl>
```

Add an additional variable for the CSS API url. If using the sandbox, add:

`process.env.SSO_API_URL=https://api-dev.loginproxy.gov.bc.ca/api/v1/integrations`

If testing your actual team, add:

`https://api.loginproxy.gov.bc.ca/api/v1/integrations`

### Running the demo

- From this folder, run:
    1. `npm i`
    2. `npm run dev`

    This will intall node modules, and start your nextjs application on localhost:3000. In the application, you can navigate through the integrations and roles tabs to see available information.

## About

This example demonstrates how you can use the CSS API to view your team's integration information through your own application, instead of using the CSS portal. In this example, you can list your existing integrations, fetch integrations by ID, and list/create new roles. The full documentation for the CSS API can be [here](https://api.loginproxy.gov.bc.ca/openapi/swagger#).

**CSS API account VS service account**: 
A CSS API account will create an additional client with service accounts enabled, similar to the service account option when creating a new integration. However, a normal service account will only provide an access token similar to a logged in user. This is best used in cases where you have an offline job (meaning there is no authenticated user when the job is running) that requires a valid access token to authenticate against another one of your services. A CSS API account's access token will have an extra `team` attribute on it, equal to that accounts team ID. This allows our API to [check](https://github.com/bcgov/sso-requests/blob/dev/lambda/css-api/src/authenticate.ts#L66) that the token has the correct access level to view and manage integrations related to that team. So if you need to use our API, you need an API account.


## Security

For easy environemnt setup, this example application has open routes for using the API. If building an admin portal, you can add authentication to this application as well using [next-auth](https://next-auth.js.org/).