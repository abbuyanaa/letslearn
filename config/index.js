const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isServer = typeof window === "undefined";

const config = {
  development: {
    isDev,
    isServer,
    SERVER_PROTOCOL: process.env.DEV_SERVER_PROTOCOL,
    HTTP_SERVER_PORT: process.env.DEV_HTTP_SERVER_PORT,
    HTTPS_SERVER_PORT: process.env.DEV_HTTPS_SERVER_PORT,
    API_URL: process.env.NEXT_PUBLIC_DEV_API_URL,
  },
  production: {
    isDev,
    isServer,
    SERVER_PROTOCOL: process.env.SERVER_PROTOCOL,
    HTTP_SERVER_PORT: process.env.HTTP_SERVER_PORT,
    HTTPS_SERVER_PORT: process.env.HTTPS_SERVER_PORT,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = config[env];
