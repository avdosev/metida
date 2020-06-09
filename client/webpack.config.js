const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const path = require('path');
const isProduction = process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development'; // TODO   не работает, фикси
console.log(mode)

module.exports = {
    entry: "./src/index.tsx",
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // этот путь будет добавляться в пути до каждого бандла внутри хтмл и других бандлов
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
                            modules: false, //без этого классы в css будут хешами(можно не ставить, если css импортирован как реакт компонент)
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", "css-loader", "sass-loader"
                ],
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?name=[name].[ext]&limit=100000'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 8080,
        watchContentBase: true,
        progress: true,
        compress: true,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'public', to: '.' },
            ],
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
}