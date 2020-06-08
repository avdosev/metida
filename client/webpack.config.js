const path = require('path');


module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/src',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: ['ts-loader', 'babel-loader' ]
            },
            {
                test: /\.ts?$/,
                exclude: /(node_modules)/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    }
}