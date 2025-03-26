import Keycloak from 'keycloak-js';

const _kc = new Keycloak({
  url: process.env.REACT_APP_SSO_AUTH_SERVER_URL,
  realm: process.env.REACT_APP_SSO_REALM,
  clientId: process.env.REACT_APP_SSO_CLIENT_ID,
});

const loginOptions = {
  redirectUri: process.env.REACT_APP_SSO_REDIRECT_URI,
  idpHint: '',
  pres_req_conf_id: process.env.REACT_APP_PRES_REQ_CONF_ID,
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
      if(loginOptions.pres_req_conf_id){
        var loginURL = await _kc?.createLoginUrl(loginOptions);
        if(loginURL){
          /* The keycloak-js library will not pass in the `pres_req_conf_id` needed for DC login
          meaning the login url must have it appended.  */
          // @ts-ignore//
          window.location.href = loginURL + '&pres_req_conf_id=' + loginOptions.pres_req_conf_id;
        };
      } else {
        console.warn("DC needs a REACT_APP_PRES_REQ_CONF_ID env variable defined to work properly");
        _kc.login(loginOptions);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

