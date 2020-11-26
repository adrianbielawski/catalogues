const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basename = '/';

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        base: basename,
    }),
    new DefinePlugin({
        'process.env.PUBLIC_URL': JSON.stringify(basename),
    })
  ],
});