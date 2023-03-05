import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-saml';
import session from 'express-session';
import fs from 'fs';
import http from 'http';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const idpCertPAth = path.join(__dirname, `${process.env.SSO_X509_CERT_FILE_NAME}`);
const idpCert = fs.readFileSync(idpCertPAth, 'utf8');

passport.serializeUser<Express.User>((user: any, done) => {
  console.log('Serialized User', user);
  done(null, user);
});

passport.deserializeUser<Express.User>((user: any, done) => {
  console.log('Deserialized User', user.id);
  done(null, user);
});

const samlStrategy = new Strategy(
  {
    audience: process.env.SSO_SP_ENTITY_ID,
    issuer: process.env.SSO_SP_ENTITY_ID,
    callbackUrl: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/callback`,
    entryPoint: process.env.SSO_SIGN_ON_SERVICE_URL,
    cert: idpCert,
    logoutUrl: process.env.SSO_LOGOUT_SERVICE_URL,
    logoutCallbackUrl: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/logout/callback`,
    signatureAlgorithm: 'sha256',
  },
  (profile: any, done: any) => {
    console.log('passport.use() profile: %s \n', JSON.stringify(profile));
    return done(null, profile);
  },
);

app.use((req, res, next) => {
  console.log(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    console.log(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
    );
  });

  next();
});

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(passport.initialize({}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
passport.use('samlStrategy', samlStrategy);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get(
  '/login',
  (req, res, next) => {
    next();
  },
  passport.authenticate('samlStrategy', {
    failureFlash: true,
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

app.post(
  '/login/callback',
  (req, res, next) => {
    next();
  },
  passport.authenticate('samlStrategy', {
    failureRedirect: '/',
    failureFlash: true,
  }),
  (req: any, res: any) => {
    res.redirect('/');
  },
);

app.get('/logout', (req: any, res, next) => {
  console.log(`User ${req.user} logged out`);
  samlStrategy.logout(req, (err, request: any) => {
    if (!err) {
      res.redirect(request);
    }
  });
});

app.post('/logout/callback', (req: any, res) => {
  req.logout();
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.get('/health', (req, res, next) => {
  return res.status(200).json({ messgae: 'Server is running!' });
});

app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

const server = http.createServer(app).listen(process.env.SERVER_PORT, () => {
  console.log(`server started on port ${process.env.SERVER_PORT}`);
});
