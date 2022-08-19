/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  assetPrefix: '',
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};
