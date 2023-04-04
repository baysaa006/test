const withImages = require('next-images');
const { env } = require('process');
module.exports = withImages({
  images: {
    disableStaticImages: true,
  },
  webpack(config, options) {
    return config;
  },
  env: {
    region: process.env.REACT_APP_REGION,
    url: process.env.REACT_APP_STAGE,
  },
});
var config = {
  paths: {
    my: 'Vendor_Module/js/owl.carousel',
  },
  shim: {
    my: {
      deps: ['jquery'],
    },
  },
};
