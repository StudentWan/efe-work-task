var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.js$/,
                exclude:
                    /node_modules/,
                loader:
                    "babel-loader"
            }
            ,
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader:
                    "url-loader?limit=10000&mimetype=application/font-woff"
            }
            ,
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader:
                    "file-loader"
            }
        ]
    },

    resolve: {
        alias: {
            'vue$':
                'vue/dist/vue.esm.js'
        }
    }
    ,

    devServer: {
        historyApiFallback: true
    }
    ,

    performance: {
        hints: false
    }
    ,

    devtool: '#eval-source-map'
}