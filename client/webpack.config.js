const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');


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
            filename: "js/[name].[hash].bundle.js",
            chunkFilename: 'js/[name].[hash].bundle.js',
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
                    test: /\.(jpg|jpeg|gif|png|svg)$/,
                    exclude: /node_modules/,
                    loader: [
                        'url-loader?limit=1024&name=images/[name].[ext]',
                        'image-webpack?progressive=true&optimizationLevel=7&interlaced=true'
                    ]

                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    exclude: /node_modules/,
                    loader: 'file-loader?name=fonts/[name].[hash].[ext]',
                    // loader: 'url-loader?name=fonts/[name].[ext]&limit=100000'
                    // можно использовать эту строчку, если нужно передавать шрифт через base64
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
            alias: {
                Components: path.resolve(__dirname, 'src/components/'),
                Containers: path.resolve(__dirname, 'src/containers/')
            }
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
            new WorkboxPlugin.GenerateSW({
                // these options encourage the ServiceWorkers to get in there fast
                // and not allow any straggling "old" SWs to hang around
                clientsClaim: true,
                skipWaiting: true,
            }),
        ]
    }
}