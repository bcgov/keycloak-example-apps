# Service Account with Nextjs App

This folder contains an example use case of a client service account. It contains two applications to demonstrate this:

- **[next-app](./next-app/)**: A nextjs web application. The application includes an [api route](./next-app/src/pages/api/message.js) that can be accessed either by a logged in user, or an offline service via a bearer token (e.g from the service account).
- **[offline-service](./offline-service/)**: A minimal nodejs service that can retrieve a valid access token using the service account, and use it to request data from the nextjs api.

## Getting Started

### Environment variable configuration

To run this demo, you will require a CSS integration with the usecase "Browser Login and Service Account". When creating an integration for this example, you can allow "*" as a redirect URI for testing locally. Ensure not to allow a wildcard URI in a production application. 

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

with a securely generated secret string.

### Running the demo

- From the [next-app](./next-app/) folder, run `npm run dev`. This will start your nextjs application on localhost:3000, where you can login to test out the browser login flow
- To test the service account, run `npm start` from the [offline-service](./offline-service/) folder. This program will log out the retrieved content from the next-js api.

## About

This example demonstrates how you can use our service to have an authenticated API that can accept logged in users via a web portal, but also allow additional server-side jobs to interact with the same API (e.g data scrapers, etl jobs) via a service account credential. It uses the [next-auth](https://next-auth.js.org/) package to handle user authentication and sessions, and the [jose](https://www.npmjs.com/package/jose) package to validate access tokens from a service account. 


## Security

When using the service account, make sure that you check the audience claim matches your applications client id. Since you are in a shared realm, checking the audience is necessary to make sure other clients access tokens won't be read as valid.