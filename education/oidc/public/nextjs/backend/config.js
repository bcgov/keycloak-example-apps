require('dotenv').config({ path: __dirname + '/../.env.local' });
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const kcConfig = require('../public/keycloak.json');

const memoryStore = new session.MemoryStore();
let keycloak = new Keycloak({ store: memoryStore }, kcConfig);

module.exports = {
  HOSTNAME: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 8080,
  keycloak,
  COOKIE_SESSION_SECRET: 'superSecretValue',
  memoryStore,
};
