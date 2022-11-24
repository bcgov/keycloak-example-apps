const axios = require('axios');
const qs = require('qs');

const {
  CSS_CLIENT_ID,
  CSS_CLIENT_SECRET,
  CSS_DOMAIN_NAME_URL,
  CSS_LOGIN_GRANT_TYPE,
  CSS_LOGIN_REDIRECT_URL,
  CSS_LOGIN_RESPONSE_TYPE,
  CSS_LOGIN_SCOPE,
  CSS_LOGOUT_REDIRECT_URL,
} = require('./config');

const btoa = (string) => Buffer.from(string).toString('base64');

const decodeValue = (base64String) => {
  try {
    return JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
  } catch {
    return '';
  }
};

const decodingJWT = (token) => {
  if (!token) return null;

  const [header, payload] = token.split('.');
  console.log('header', header);

  return {
    header: decodeValue(header),
    payload: decodeValue(payload),
  };
};

// see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
const getAuthorizationUrl = async ({ identity_provider } = {}) => {
  const params = {
    client_id: CSS_CLIENT_ID,
    response_type: CSS_LOGIN_RESPONSE_TYPE,
    scope: CSS_LOGIN_SCOPE,
    redirect_uri: CSS_LOGIN_REDIRECT_URL,
  };

  // Give an option to select an identity provider.
  if (identity_provider) {
    params.identity_provider = identity_provider;
  }

  //return `${COGNITO_DOMAIN_NAME_URL}/authorize?${qs.stringify(params, { encode: false })}`;
  return `${CSS_DOMAIN_NAME_URL}/auth?${qs.stringify(params, { encode: false })}`;
};

// see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
// see https://aws.amazon.com/blogs/mobile/understanding-amazon-cognito-user-pool-oauth-2-0-grants/
const getAccessToken = async ({ code }) => {
  //const url = `${COGNITO_DOMAIN_NAME_URL}/oauth2/token`;
  const url = `${CSS_DOMAIN_NAME_URL}/token`;
  console.log('---------URL---', url);
  const params = {
    grant_type: CSS_LOGIN_GRANT_TYPE,
    client_id: CSS_CLIENT_ID,
    redirect_uri: CSS_LOGIN_REDIRECT_URL,
    code,
  };

  // see https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
  // see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.4
  // Oauth2 response + OpenID Connect spec; id_token
  // {
  //   id_token: "xxxxxxx...",
  //   access_token: "xxxxxxx...",
  //   refresh_token: "xxxxxxx...",
  //   expires_in: 3600,
  //   token_type: "Bearer",
  // };
  const config = {
    url,
    method: 'post',
    data: qs.stringify(params),
  };

  if (CSS_CLIENT_SECRET) {
    config.headers = { Authorization: `Basic ${btoa(`${CSS_CLIENT_ID}:${CSS_CLIENT_SECRET}`)}` };
  }

  const { data } = await axios(config);

  const { id_token, access_token, refresh_token } = data;

  // Decode tokens to get user information
  data.id_token_decoded = decodingJWT(id_token);
  data.access_token_decoded = decodingJWT(access_token);
  data.refresh_token_decoded = decodingJWT(refresh_token);

  return data;
};

const getUserInfo = async ({ accessToken }) => {
  const url = `${CSS_DOMAIN_NAME_URL}/userinfo`;
  const { data } = await axios({
    url,
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // {
  //   sub: 'xxxxxxxx-xxxx-...',
  //   email_verified: 'true',
  //   email: 'example@example.com',
  //   username: 'xxxxxxxx-xxxx-...'
  // }

  return data;
};

const getLogoutUrl = async () => {
  const params = {
    client_id: CSS_CLIENT_ID,
    logout_uri: CSS_LOGOUT_REDIRECT_URL,
  };

  return `${CSS_DOMAIN_NAME_URL}/logout?${qs.stringify(params, { encode: false })}`;
};

module.exports = { getAuthorizationUrl, getAccessToken, getUserInfo, getLogoutUrl };
