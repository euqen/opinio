const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        client: [
            "./src/index.jsx"
        ],
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
        port: 3339,
        host: "0.0.0.0",
        watchOptions: {
            poll: true
        }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [["es2015"], ["react"],["stage-2"]],
                    plugins: [['import', {libraryName: 'antd', style: 'css'}]],
                },
            }, {
                loader: "eslint-loader",
                options: {
                    fix: true,
                    cache: true,
                }
            }],
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
        }],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({ title: 'Opinio Development' }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
    ]
};