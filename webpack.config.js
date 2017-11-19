var path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/public/',
        filename: "bundle.js"
    },
    module: {
        rules: [{
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["env",'es2015']
                }
            },
            {
                test: /\.css?$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },

    devtool: "env-source-map"
}