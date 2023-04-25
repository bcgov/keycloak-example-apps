import { passport, keycloakClient, tokenset } from './server.js';

const checkAuthenticated = (req, res, next) => {
  if (req?.session?.passport?.user) {
    return next();
  }
  res.redirect('/');
};

export const setRoutes = (router) => {
  router.get('/auth/callback', (req, res, next) => {
    passport.authenticate('oidc', {
      successRedirect: '/home',
      failureRedirect: '/',
    })(req, res, next);
  });

  router.get('/', (req, res, next) => {
    res.render('index', {});
  });

  router.get('/auth', (req, res, next) => {
    passport.authenticate('oidc')(req, res, next);
  });

  router.get('/home', checkAuthenticated, (req, res, next) => {
    res.render('home', {
      username: `${req.session.passport.user.given_name} ${req.session.passport.user.family_name}`,
      role: `${req.session.passport.user.client_roles}`,
    });
  });

  router.get('/logout', (req, res, next) => {
    req.session.destroy();
    const retUrl = `${process.env.SSO_AUTH_SERVER_URL}/realms/${
      process.env.SSO_REALM
    }/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
      process.env.SSO_LOGOUT_REDIRECT_URI,
    )}&id_token_hint=${tokenset.id_token}`;
    res.redirect(`https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(retUrl)}`);
  });
};
