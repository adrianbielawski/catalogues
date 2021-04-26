const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const basename = '/';

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: basename,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        base: basename,
    }),
    new DefinePlugin({
        'process.env.PUBLIC_URL': JSON.stringify(basename),
        'process.env.API_URL': JSON.stringify('https://api.catalogues.adrian.bielaw.ski'),
        'process.env.SENTRY_DSN': JSON.stringify('https://5763d8b612f54d1394233487c167d4a5@o576404.ingest.sentry.io/5729944'),
    }),
    new SentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "catalogues",
      project: "catalogues",
      include: "src",
      ignore: ["node_modules", "webpack.config.js"],
    }),
  ],
});
