const BASE_PATH = process.env.APP_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  basePath: BASE_PATH,
};

module.exports = nextConfig;
