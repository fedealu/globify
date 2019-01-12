require('module-alias/register');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATHS_ALIASES }  = require('./paths/paths');


module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].[hash:base64:5].bundle.js',
        path: path.resolve(__dirname, '/dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                },
                exclude: /(node_modules)/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'React Globify by Federico Aluma'
        }),
    ],
    resolve: {
        alias: PATHS_ALIASES || {}
    }
}