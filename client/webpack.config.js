const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {CopyWebpackPlugin} = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');



const path = require('path');
const isProduction = process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development'; // TODO   не работает, фикси
console.log(mode)

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/src',
        filename: "js/[name].bundle.js"
    },
    mode,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader',

                options: {
                    compilerOptions: {
                        "sourceMap": !isProduction,
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?name=[name].[ext]&limit=100000'
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", "css-loader", "sass-loader"
                ],
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        watchContentBase: true,
        progress: true,
        compress: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: 'public/index.html',
                to: './index.html'
            },
            {
                from: 'src/assets/**/*',
                to: './assets',
                transformPath(targetPath, absolutePath) {
                    return targetPath.replace('src/assets', '');
                }
            },
        ]),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true
            }
        })
    ]
}