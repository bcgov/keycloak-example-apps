import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import { Issuer, Strategy } from 'openid-client';
import * as dotenv from 'dotenv';
import { setRoutes } from './routes.js';

const store = new session.MemoryStore();

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(
  session({
    secret: process.env.SSO_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
  }),
);

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(
  session({
    secret: process.env.SSO_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
    store,
  }),
);

app.use(express.urlencoded({ extended: false }));

const router = express.Router();

setRoutes(router);

app.use('/', router);

const keycloakIssuer = await Issuer.discover(
  `${process.env.SSO_AUTH_SERVER_URL}/realms/${process.env.SSO_REALM}/.well-known/openid-configuration`,
);

const keycloakClient = new keycloakIssuer.Client({
  client_id: process.env.SSO_CLIENT_ID,
  client_secret: process.env.SSO_CLIENT_SECRET,
  redirect_uris: ['http://localhost:3000/auth/callback'],
  response_types: ['code'],
});

//Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

let tokenset = {};

passport.use(
  'oidc',
  new Strategy({ client: keycloakClient }, (tokenSet, userinfo, done) => {
    tokenset = tokenSet;
    return done(null, tokenSet.claims());
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.listen(3000, function () {
  console.log('Listening at http://localhost:3000');
});

export { passport, keycloakClient, tokenset };
