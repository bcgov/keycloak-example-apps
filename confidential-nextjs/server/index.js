const express = require("express");
const next = require("next");
const ssoUtils = require("@bcgov-cas/sso-express");
const session = require('express-session')
const sessionStore = new session.MemoryStore();

// Add your configuration details
const keycloakConfig = {}

const { ssoMiddleware, keycloak } = new ssoUtils({
  // See https://github.com/bcgov/cas-template-app/tree/develop/packages/sso-express for full configuration options
  sessionStore: {...sessionStore, idpHint: 'idir'},
  getLandingRoute: (req) => '/protected',
  keycloakConfig,
});

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(session({
      secret: 'some secret',
      resave: false,
      saveUninitialized: true,
      store: sessionStore
    }));

    server.use(ssoMiddleware);

    // Add keycloak middleware to protected routes
    server.all("/protected", keycloak.protect(), (req, res) => {
      return app.render(req, res, '/protected')
    });

    // Open routes
    server.all("*", (req, res) => {
      handle(req, res)
    });
        
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();