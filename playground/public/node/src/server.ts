import express from 'express';
import passport from 'passport';
import session from 'express-session';
import fs from 'fs';
import http from 'http';
import path from 'path';
import * as dotenv from 'dotenv';
import { SamlStrategy } from './strategy';
import { formatXml } from './utils';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();
let samlFormInputs = { signOnUrl: '', logoutUrl: '', entityId: '', x509Cert: '' };
let samlResponse = '';

passport.serializeUser<Express.User>((user: any, done) => {
  console.log('Serialized User', user);
  samlResponse = formatXml(user.getSamlResponseXml());

  done(null, user);
});

passport.deserializeUser<Express.User>((user: any, done) => {
  console.log('Deserialized User', user.id);
  done(null, user);
});

const passportSamlStrategy = new SamlStrategy();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // max 100 requests per minute
});

app.use(limiter);

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
    secret: process.env.SESSION_SECRET ?? 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
    },
  }),
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(passport.initialize({}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
//passport.use('samlStrategy', samlStrategy);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.APP_URI);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.get('/', (req, res) => {
  res.render('index', { user: req.user, inputs: req.cookies['samlFormInputs'] || samlFormInputs, samlResponse });
});

app.post('/login', (req, res) => {
  passportSamlStrategy.createStrategy({ ...req.body });
  res.cookie('samlFormInputs', { ...req.body }, { maxAge: 900000, httpOnly: true });
  passport.authenticate(passportSamlStrategy.getStrategy() as any, {
    failureFlash: true,
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  })(req, res);
});

app.post('/login/callback', (req: any, res, next) => {
  passport.authenticate(passportSamlStrategy.getStrategy() as any, {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true,
  })(req, res, next);
});

app.get('/logout', (req: any, res, next) => {
  console.log(`User ${req.user} logged out`);
  const samlStrategy = passportSamlStrategy.getStrategy();
  samlStrategy.logout(req, (err: any, requestUrl: any) => {
    res.redirect(requestUrl);
  });
});

app.post('/logout/callback', (req, res) => {
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
