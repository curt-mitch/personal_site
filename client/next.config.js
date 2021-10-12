/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  /* config options here */
}

const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);

module.exports = withTM();
