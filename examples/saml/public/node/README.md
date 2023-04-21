# SSO Pathfinder SAML Client Using Node-Express

## Description

This is an example backend app that authenticates users using SAML

## Getting Started

## Pre-requisites

- You require an integration with client type `SAML` before you can start using this example app
- Navigate to [SSO Onboarding](https://github.com/bcgov/sso-keycloak/wiki/SSO-Onboarding) to know more about creating an integration
- Download the installation JSON for specific environment

## Installing

- Create `.env` from `.env.example` and update required values

In the project directory, you can run either `yarn` or `npm` commands:

### `yarn install` or `npm install`

Installs dependencies from `package.json`

### `yarn local` or `npm run local`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.

## Troubleshooting

- You may see `Logout Failed` error when attempting to logout
- The logout functionality does not work due to limitation of access in updating `Logout Service POST Binding URL` under `Fine Grain SAML Endpoint Configuration` settings of the client
- Login to keycloak and manually update the setting with value `http://localhost:8080/logout/callback`. **Note: Update the host and port if different**
