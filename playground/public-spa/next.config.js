const BASE_PATH = process.env.APP_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  basePath: BASE_PATH,
  publicRuntimeConfig: {
    sso_redirect_uri: process.env.SSO_REDIRECT_URI || 'http://localhost:3000',
    app_env: process.env.APP_ENV || 'local',
  },
};

module.exports = nextConfig;
