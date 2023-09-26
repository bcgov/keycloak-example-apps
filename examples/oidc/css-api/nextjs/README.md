# Service Account with Nextjs App

This folder contains an example application using the CSS API, built with nextjs.

## Getting Started

### Prerequisites

Ensure to have npm and nodejs installed, with a version of node >= 18.0.0.

### Environment variable configuration

To run this demo, you will require a CSS API account. From the CSS Application, navigate to to **My Dashboard**, and select the **My Teams** tab. If you do not have a team, you can create one. (Why do people need a team to do role management?). Once you have a team, select the CSS API Account tab below and create an API account.

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

    This will intall node modules, and start your nextjs application on localhost:3000.

## About

This example demonstrates how you can use our service to have an authenticated API that can accept logged in users via a web portal, but also allow additional server-side jobs to interact with the same API (e.g data scrapers, etl jobs) via a service account credential. It uses the [next-auth](https://next-auth.js.org/) package to handle user authentication and sessions, and the [jose](https://www.npmjs.com/package/jose) package to validate access tokens from a service account. 


## Security

When using the service account, make sure that you check the audience claim matches your applications client id. Since you are in a shared realm, checking the audience is necessary to make sure other clients access tokens won't be read as valid.