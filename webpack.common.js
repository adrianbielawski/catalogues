const path = require('path');
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            components: path.join(__dirname, 'src', 'components'),
            store: path.join(__dirname, 'src', 'store'),
            global_styles: path.join(__dirname, 'src', 'global_styles'),
            assets: path.join(__dirname, 'assets'),
            src: path.join(__dirname, 'src'),
            hoc: path.join(__dirname, 'src', 'hoc'),
        },
        modules: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'assets'),
            'node_modules'
        ],
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
              test: /\.(ts|tsx)$/,
              loader: "ts-loader",
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:3]',
                                exportLocalsConvention: 'dashes',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader',
                ]
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: 'svg-url-loader',
                  options: {
                    limit: 10000,
                  },
                },
              ],
            },
            {
              test: /\.js$/,
              enforce: 'pre',
              use: ['source-map-loader']
            }
        ]
    },
    plugins: [
        new FaviconsWebpackPlugin("./assets/img/icon.svg"),
    ],
};