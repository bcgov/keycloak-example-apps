const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const _ = require('lodash');

const { getAuthorizationUrl, getAccessToken, getUserInfo, getLogoutUrl } = require('./init-express');

const { COOKIE_SESSION_NAME, COOKIE_SESSION_SECRET } = require('./config');

const THIRTY_DAYS = 30 * 24 * (60 * 60 * 1000);

const logger = morgan('combined');

const initExpresss = async () => {
  const expressServer = express();

  expressServer.use(logger);
  expressServer.use(bodyParser.json());
  expressServer.use(bodyParser.urlencoded({ extended: false }));
  expressServer.use(cookieParser());

  const store = new MemoryStore({
    checkPeriod: THIRTY_DAYS,
  });

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
      store,
    }),
  );

  // Login
  expressServer.get('/oauth/login', async (req, res) => {
    try {
      if (req.session.user) {
        res.redirect(`/`);
      } else {
        const authUrl = await getAuthorizationUrl();
        console.log('-----------LOGIN---------', authUrl);
        res.redirect(authUrl);
      }
    } catch (err) {
      console.error(err);
      res.json({ success: false, error: err.message || err });
    }
  });

  // Callback; Authorization Response
  // see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2
  expressServer.get('/oauth', async (req, res) => {
    try {
      const { code } = req.query;
      console.log('-----------AUTH RESPONSE---------', code);
      const tokens = await getAccessToken({ code });
      const { access_token } = tokens;
      const userInfo = await getUserInfo({ accessToken: access_token });

      req.session.authorization = {
        ...req.query,
      };

      req.session.tokens = {
        ...tokens,
      };

      req.session.user = {
        ...userInfo,
      };

      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.json({ success: false, error: err.message || err });
    }
  });

  expressServer.get('/oauth/logout', (req, res) => {
    try {
      if (req.session.user) {
        req.session.user = undefined;
      }
      const logoutUrl = getLogoutUrl();
      console.log('-----------LOGING OUT---------', logoutUrl);
      res.redirect(logoutUrl);
    } catch (err) {
      console.error(err);
      res.json({ success: false, error: err.message || err });
    }
  });

  expressServer.disable('x-powered-by');

  expressServer.set('trust proxy', 1);

  return expressServer;
};

module.exports = initExpresss;
