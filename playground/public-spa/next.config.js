const BASE_PATH = process.env.APP_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  basePath: BASE_PATH,
  output: process.env.STATIC_SITE === 'true' ? 'export' : undefined,
};

module.exports = nextConfig;
