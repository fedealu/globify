require('module-alias/register');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATHS_ALIASES }  = require('./paths/paths');


module.exports = {
    context: path.join(__dirname, '../'),
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'app.bundle.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/',

    },
    module: {
        rules: [
            {
                test: /\.(scss|css|sass)/,
                use: [
                        'style-loader',
                        { 
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        'sass-loader'
                    ]
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                },
                exclude: /(node_modules)/,
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true, // webpack@1.x
                      disable: true, // webpack@2.x and newer
                    },
                  },
                ],
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