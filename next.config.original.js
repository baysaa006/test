const {
    withPlugins
  } = require('next-compose-plugins');
  const withOptimizedImages = require('next-optimized-images');
  // https://n24ntqciq6.execute-api.us-east-1.amazonaws.com/prod/graphql
  // next.js configuration
  const nextConfig = {
    env: {
      STRIPE_PUBLIC_KEY: 'your_stripe_public_key',
      API_URL: 'https://92mzlybwuf.execute-api.ap-east-1.amazonaws.com/prod/menu/graphql',
      WEBSOCKET_URL: 'ws://localhost:4000/graphql',
    },
    webpack: (config) => {
      config.resolve.modules.push(__dirname);
  
      config.resolve.alias = {
        ...config.resolve.alias,
      };
      return config;
    },
  };
  
  module.exports = withPlugins([withOptimizedImages], nextConfig);