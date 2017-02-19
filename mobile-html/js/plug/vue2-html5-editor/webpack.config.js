var path = require("path")
var package = require("./package.json")
var webpack = require("webpack")
module.exports = {
    context: __dirname + "/src",
    entry: "./index.js",
    output: {
        path: __dirname + "/dist",
        filename: "vue2-html5-editor.js",
        libraryTarget: "umd",
        library: "Vue2Html5Editor"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /(\.html)$/, loader: "html-loader"},
            {test: /\.(jpg)|(png)|(gif)$/, loader: "url-loader"},
            {test: /\.vue$/, loader: "vue-loader"},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ROOT: JSON.stringify(path.normalize(__dirname)),
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(package.version),
        })
    ],
    debug: false,
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}
