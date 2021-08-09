const custom = require('../webpack.config.js');

module.exports = {
  stories: [
    "../frontend/src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config) => {
    return { ...config, resolve: { ...config.resolve, alias: custom.resolve.alias } };
  },}
