const axios = require('axios');
const qs = require('qs');

const {
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_AUTHORIZATION_URL,
  OIDC_TOKEN_URL,
  OIDC_USER_INFO_URL,
  OIDC_LOGOUT_URL,
  OIDC_GRANT_TYPE,
  OIDC_REDIRECT_URL,
  OIDC_RESPONSE_TYPE,
  OIDC_SCOPE,
  OIDC_LOGOUT_REDIRECT_URL,
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
    client_id: OIDC_CLIENT_ID,
    response_type: OIDC_RESPONSE_TYPE,
    scope: OIDC_SCOPE,
    redirect_uri: OIDC_REDIRECT_URL,
  };

  // Give an option to select an identity provider.
  if (identity_provider) {
    params.identity_provider = identity_provider;
  }

  return `${OIDC_AUTHORIZATION_URL}?${qs.stringify(params, { encode: false })}`;
};

// see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
const getAccessToken = async ({ code }) => {
  const url = OIDC_TOKEN_URL;
  console.log('---------URL---------', url);
  const params = {
    grant_type: OIDC_GRANT_TYPE,
    client_id: OIDC_CLIENT_ID,
    redirect_uri: OIDC_REDIRECT_URL,
    code,
  };

  const config = {
    url,
    method: 'post',
    data: qs.stringify(params),
  };
  if (OIDC_CLIENT_SECRET) {
    config.headers = { Authorization: `Basic ${btoa(`${OIDC_CLIENT_ID}:${OIDC_CLIENT_SECRET}`)}` };
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
  const { data } = await axios({
    url: OIDC_USER_INFO_URL,
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

const getLogoutUrl = () => {
  const params = {
    client_id: OIDC_CLIENT_ID,
    redirect_uri: OIDC_LOGOUT_REDIRECT_URL,
  };

  return `${OIDC_LOGOUT_URL}?${qs.stringify(params, { encode: false })}`;
};

module.exports = { getAuthorizationUrl, getAccessToken, getUserInfo, getLogoutUrl };
