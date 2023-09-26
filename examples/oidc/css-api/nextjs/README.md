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
SSO_API_URL=<tokenUrl>
```

### Running the demo

- From this folder, run:
    1. `npm i`
    2. `npm run dev`

    This will intall node modules, and start your nextjs application on localhost:3000. In the application, you can navigate through the integrations and roles tabs to see available information.

## About

This example demonstrates how you can use the CSS API to view your team's integration information through your own application, instead of using the CSS portal. In this example, you can list your existing integrations, fetch integrations by ID, and list/create new roles. The full documentation for the CSS API can be [here](https://api.loginproxy.gov.bc.ca/openapi/swagger#).


## Security

For easy environemnt setup, this example application has open routes for using the API. If building an admin portal, you can add authentication to this application as well using [next-auth](https://next-auth.js.org/).