const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, 'docs'),
        filename: 'main.[contenthash].js',
        chunkFilename: 'vendor.[contenthash].js',
        publicPath: '/'
    },
    optimization: {
	    splitChunks: {
            chunks: 'all',
            minSize: 350000,
            maxSize: 500000
	    },
	},
    module: {
        rules: [ 
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass'),
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: 'svg-url-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
    }
}