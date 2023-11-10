/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push(
      "pino-pretty",
      "lokijs",
      "encoding"
    );
  return config;
}
}
require('dotenv').config();

module.exports = nextConfig
