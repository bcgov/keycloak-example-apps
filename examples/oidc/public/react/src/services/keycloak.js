import Keycloak from 'keycloak-js';

const _kc = new Keycloak({
  url: process.env.REACT_APP_SSO_AUTH_SERVER_URL,
  realm: process.env.REACT_APP_SSO_REALM,
  clientId: process.env.REACT_APP_SSO_CLIENT_ID,
});

const loginOptions = {
  // https://logon7.gov.bc.ca/clp-cgi/logoff.cgi uri performs siteminder logout
  redirectUri: `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
    process.env.REACT_APP_SSO_REDIRECT_URI,
  )}`,
  idpHint: '',
};

export const initializeKeycloak = async () => {
  try {
    _kc.onTokenExpired = () => {
      _kc.updateToken();
    };

    const auth = await _kc.init({
      pkceMethod: 'S256',
      checkLoginIframe: false,
      onLoad: 'login-required',
    });

    if (auth) {
      return _kc;
    } else {
      _kc.login(loginOptions);
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => {
  _kc.logout();
};
