const path = require('path');
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { ProvidePlugin } = require('webpack');

const plugins = [
    new FaviconsWebpackPlugin("./assets/img/icon.svg"),
    new ProvidePlugin({ process: 'process/browser' }),
];

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
        fallback: { path: require.resolve('path-browserify') }
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
                exclude: /node_modules/,
                use: ['source-map-loader']
            },
            {
                test: /\.m?js$/,
                include: /react-leaflet/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins,
};