const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


module.exports = env => {
    console.log(env)
    const isProduction = env && env.hasOwnProperty('production') && env.production

    const mode = isProduction ? 'production' : 'development';
    const devtool = isProduction ? '' : 'eval-cheap-module-source-map'
    console.log(mode)
    console.log(devtool)

    return {
        entry: "./src/index.tsx",
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/', // этот путь будет добавляться в пути до каждого бандла внутри хтмл и других бандлов
            filename: "js/[name].bundle.js",
            chunkFilename: 'js/[name].bundle.js',
        },
        mode,
        devtool: devtool,
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
            port: 3000,
            watchContentBase: true,
            progress: true,
            compress: true,
            hot: true,
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
                    {from: 'public', to: '.'},
                ],
            }),
            new HtmlWebpackPlugin({template: './public/index.html'}),
        ]
    }
}