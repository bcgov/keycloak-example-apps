import Keycloak from 'keycloak-js'

const logoutOptions = {
  // https://logon7.gov.bc.ca/clp-cgi/logoff.cgi uri performs siteminder logout
  redirectUri: `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
    `${import.meta.env.VITE_SSO_REDIRECT_URI}`
  )}`,
  idpHint: '',
}

const loginOptions = {
  redirectUri: import.meta.env.VITE_SSO_REDIRECT_URI,
  idpHint: '',
}

const _kc = new Keycloak({
  url: `${import.meta.env.VITE_SSO_AUTH_SERVER_URL}`,
  realm: `${import.meta.env.VITE_SSO_REALM}`,
  clientId: `${import.meta.env.VITE_SSO_CLIENT_ID}`,
})

export const initializeKeycloak = async () => {
  try {
    _kc.onTokenExpired = () => {
      _kc.updateToken()
    }

    const auth = await _kc.init({
      pkceMethod: 'S256',
      checkLoginIframe: false,
      onLoad: 'login-required',
    })

    if (auth) {
      return _kc
    } else {
      _kc.login(loginOptions)
    }
  } catch (err) {
    console.log(err)
  }
}

export const logout = () => {
  _kc.logout(logoutOptions)
}
