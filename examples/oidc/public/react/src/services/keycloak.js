import Keycloak from 'keycloak-js';

const _kc = new Keycloak({
  url: process.env.REACT_APP_SSO_AUTH_SERVER_URL,
  realm: process.env.REACT_APP_SSO_REALM,
  clientId: process.env.REACT_APP_SSO_CLIENT_ID,
});

const loginOptions = {
  redirectUri: process.env.REACT_APP_SSO_REDIRECT_URI,
  idpHint: '',
};

export const initializeKeycloak = async () => {
  try {
    _kc.onTokenExpired = () => {
      _kc
        .updateToken(5)
        .then(function (refreshed) {
          if (refreshed) {
            alert('Token was successfully refreshed');
          } else {
            alert('Token is still valid');
          }
        })
        .catch(function () {
          alert('Failed to refresh the token, or the session has expired');
        });
    };

    const auth = await _kc.init({
      pkceMethod: 'S256',
      checkLoginIframe: false,
      onLoad: 'check-sso',
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

// since we have to perform logout at siteminder, we cannot use keycloak-js logout method so manually triggering logout through a function
// if using post_logout_redirect_uri, then either client_id or id_token_hint has to be included and post_logout_redirect_uri need to match
// one of valid post logout redirect uris in the client configuration
export const logout = () => {
  window.location.href = `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
    `${process.env.REACT_APP_SSO_AUTH_SERVER_URL}/realms/${process.env.REACT_APP_SSO_REALM}/protocol/openid-connect/logout?post_logout_redirect_uri=` +
      process.env.REACT_APP_SSO_REDIRECT_URI +
      '&id_token_hint=' +
      _kc.idToken,
  )}`;
};
