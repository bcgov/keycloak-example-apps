# Service Account with Nextjs App

This folder contains an example use case of a client service account. It contains two applications to demonstrate this:

- **[next-app](./next-app/)**: A nextjs web application. The application includes an [api route](./next-app/src/pages/api/message.js) that can be accessed either by a logged in user, or an offline service via a bearer token (e.g from the service account).
- **[offline-service](./offline-service/)**: A minimal nodejs service that can retrieve a valid access token using the service account, and use it to request data from the nextjs api.

## Getting Started

### Prerequisites

Ensure to have npm and nodejs installed, with a version of node >= 18.0.0.

### Environment variable configuration

To run this demo, you will require a CSS integration with the usecase "Browser Login and Service Account". When creating an integration for this example, you can add either "http://localhost:3000/*" for the redirect uri, or just "\*" if using a different port to run the app locally. Ensure not to allow a wildcard URI in a production application. 

In both the [next-app](./next-app/) and [offline-service](./offline-service/) folders, create a .env file with the following content (see below for values to add from your installation JSON):

```
SSO_CLIENT_ID="..."
SSO_CLIENT_SECRET="..."
SSO_ISSUER="..."
```

Download your integrations Installation JSON. For the **SSO_CLIENT_ID**, use the JSON's "resource" value. For the **SSO_CLIENT_SECRET**, use the JSON's "credentials.secret" value. For the **SSO_ISSUER**, use the JSON's "auth-server-url" value and the "realm" value to build a url in the format "<auth-server-url>/realms/<realm>", e.g "https://sso-keycloak-e4ca1d-dev.apps.gold.devops.gov.bc.ca/auth/realms/standard". 

For the next-app's .env file, add the additional line:

```
NEXTAUTH_SECRET="..." 
```

with a securely generated secret string. For local testing you can use any random word. If running in production, ensure to create a secure randomly generated string, ideally more than 24 bytes long.

### Running the demo

- From the [next-app](./next-app/) folder, run:
    1. `npm i`
    2. `npm run dev`

    This will intall node modules, and start your nextjs application on localhost:3000, where you can login to test out the browser login flow.

- Once the app is running, you can test authenticating to it from the offline service. In another terminal, navigate to the [offline-service](./offline-service/) folder and run:
    1. `npm i`
    2. `npm start` 
    
    This program will use an access token from the service account to hit the next-app api route with a valid credential, and log the result to the console.

## About

This example demonstrates how you can use our service to have an authenticated API that can accept logged in users via a web portal, but also allow additional server-side jobs to interact with the same API (e.g data scrapers, etl jobs) via a service account credential. It uses the [next-auth](https://next-auth.js.org/) package to handle user authentication and sessions, and the [jose](https://www.npmjs.com/package/jose) package to validate access tokens from a service account. 


## Security

When using the service account, make sure that you check the audience claim matches your applications client id. Since you are in a shared realm, checking the audience is necessary to make sure other clients access tokens won't be read as valid.