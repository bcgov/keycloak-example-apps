# SSO Pathfinder SAML Playground (Node-Express)

## Description

This is the source code for the SAML Playground application, which demonstrates SAML authentication and helps developers test and troubleshoot SAML integrations.

## Getting Started

## Pre-requisites

- You require an integration with client type `SAML` before you can start using this example app
- Navigate to [SSO Onboarding](https://mvp.developer.gov.bc.ca/docs/default/component/css-docs/SSO-Onboarding/) to know more about creating an integration
- Download the installation JSON for specific environment
- Ensure the Logout URL (http://localhost:8080/logout/callback) is added to your integration configuration.

## Installing

- Create `.env` from `.env.example` and update required values

In the project directory, you can run either `yarn` or `npm` commands:

### `yarn install` or `npm install`

Installs dependencies from `package.json`

### `yarn local` or `npm run local`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.


## Mapping Installation JSON to UI Fields
When you download the installation JSON from the SSO service, map the fields as follows:

- **SSO Service URL** → Single Sign-On Service URL
- **Logout URL** → Single Logout Service URL
-- **Entity ID** → Service Provider Entity ID


## Troubleshooting

- You may see `Logout Failed` error when attempting to logout
- The logout functionality does not work due to limitation of access in updating `Logout Service POST Binding URL` under `Fine Grain SAML Endpoint Configuration` settings of the client
- Login to keycloak and manually update the setting with value `http://localhost:8080/logout/callback`. **Note: Update the host and port if different**

## Deployments

- Navigate to saml-playground helm chart is located at `https://github.com/bcgov/sso-helm-charts`
- Login to Openshift using `oc` CLI
- Run `helm upgrade --install saml-playground ./charts/saml-playground -n <NAMESPACE> -f values.yaml`
