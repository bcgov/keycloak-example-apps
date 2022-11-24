require('dotenv').config({ path: __dirname + '/../.env' });

/*
Keycloak allows us to define all endpoint urls with a suffix to
a base URL.  The queries and params following the url are common
to all providers that follow OIDC specs.  This app could be adapted
to a different OIDC provider by altering the .env file and urls the exported
here.
*/
module.exports = {
  HOSTNAME: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 3000,
  OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID || '',
  OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET || '',
  OIDC_AUTHORIZATION_URL: `${process.env.CSS_DOMAIN_NAME_URL}/auth` || '',
  OIDC_TOKEN_URL: `${process.env.CSS_DOMAIN_NAME_URL}/token` || '',
  OIDC_USER_INFO_URL: `${process.env.CSS_DOMAIN_NAME_URL}/userinfo` || '',
  OIDC_LOGOUT_URL: `${process.env.CSS_DOMAIN_NAME_URL}/logout` || '',
  OIDC_GRANT_TYPE: process.env.OIDC_GRANT_TYPE || '',
  OIDC_REDIRECT_URL: process.env.OIDC_REDIRECT_URL || '',
  OIDC_RESPONSE_TYPE: process.env.OIDC_RESPONSE_TYPE || '',
  OIDC_SCOPE: process.env.OIDC_SCOPE || '',
  OIDC_LOGOUT_REDIRECT_URL: process.env.OIDC_LOGOUT_REDIRECT_URL || '',
  COOKIE_SESSION_NAME: process.env.COOKIE_SESSION_NAME || '',
  COOKIE_SESSION_SECRET: process.env.COOKIE_SESSION_SECRET || 'verysecuresecret',
};
