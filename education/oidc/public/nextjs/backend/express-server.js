const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { COOKIE_SESSION_NAME, COOKIE_SESSION_SECRET, keycloak, memoryStore } = require('./config');
const THIRTY_DAYS = 30 * 24 * (60 * 60 * 1000);

const initExpresss = async () => {
  const expressServer = express();
  expressServer.use(cookieParser());

  expressServer.use(
    session({
      name: COOKIE_SESSION_NAME,
      secret: COOKIE_SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: THIRTY_DAYS,
        httpOnly: true,
        secure: false,
      },
      secure: true,
      store: memoryStore,
    }),
  );

  expressServer.use(keycloak.middleware());

  expressServer.get('/api/secret', keycloak.protect(), async (req, res) => {
    res.status(200).json({ message: 'Mellon' });
  });

  expressServer.get('/api/open', async (req, res) => {
    res.status(200).json({ message: 'Open to the world' });
  });

  return expressServer;
};

module.exports = initExpresss;
