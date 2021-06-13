const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basename = '/';

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
    base: basename,
  }),
  new DefinePlugin({
    'process.env.PUBLIC_URL': JSON.stringify(basename),
    'process.env.API_URL': JSON.stringify('https://192.168.1.10:8000'),
    'process.env.WS_URL': JSON.stringify('ws://192.168.1.10:8000'),
  })
];

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    https: true,
  },
  devtool: 'eval-cheap-module-source-map',
  plugins
});