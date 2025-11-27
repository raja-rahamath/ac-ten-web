const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@agentcare/ui', '@agentcare/utils'],
};

module.exports = withNextIntl(nextConfig);
