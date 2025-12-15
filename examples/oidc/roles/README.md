# SSO Pathfinder Rolebased Client Using Node-Express

## Description

This is an example backend app that authenticates users using OpenID-Connect standard flow and helps the user check their roles

## Getting Started

## Pre-requisites

- You require an integration with client-type `confidential` before you can start using this example app
- Navigate to [SSO Onboarding Guide](https://mvp.developer.gov.bc.ca/docs/default/component/css-docs/SSO-Onboarding/) to learn more about creating an integration
- When creating the integration request add `http://localhost:3000/*` to the list of valid redirect URIs for your integration.
- Once you've successfully set up an integration via the CSS app, select your integration in the dashboard and access the `Technical Details` tab. From there, simply choose the desired environment (Development, Test, or Production) and click the corresponding button to download a JSON file containing your integration details.

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


## Creating and Assigning Roles

If you log into the example app without role(s) assigned to the user, no roles will be displayed.

To create and assign roles for a user:
1. Select your integration in the **CSS App**.
2. Create the role in the **Role Management** tab.
3. Add users to the role in the **Assign Users to Roles** tab.

> **Note:** Roles do not have to be `admin`, `editor`, or `viewonly` as previously described. You can define custom roles as needed.  
> If composite roles are involved, the app will display **effective roles**.

The server.js file uses the Passport middleware to extract user roles from the access token. This is parsed by [routes.js](./ the app is rendered with the assigned routes.

Conditionally rendering pages for a given role (e.g., `admin`, `editor`, `viewonly`) can be done in routes.js.
``
