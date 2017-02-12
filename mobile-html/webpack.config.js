
var webpack = require('webpack')
    ,path = require('path')
    ,HtmlWebpackPlugin = require('html-webpack-plugin')
    ,ImageminPlugin = require('imagemin-webpack-plugin')
    ,CleanPlugin = require('clean-webpack-plugin')
    ,ExtractTextPlugin = require("extract-text-webpack-plugin")
    ,CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
    ,build =  process.env.NODE_ENV === 'build'
    ,local = ''
    ,http = ''; 


const CSS = new ExtractTextPlugin('stylesheets/[name].less');
const SASS = new ExtractTextPlugin('stylesheets/[name].less');

module.exports = {
    entry: { 
        app : './js/main.js',
        /*vendor : ["Vue", "VueRouter"]*/
    },
    /*externals : {
        '$' : 'window.zepto',
        'Vue' : 'window.Vue',
        'VueRouter' : 'window.VueRouter'
    },*/
    output: {
        path: path.join(__dirname, "/build"),
        publicPath: build ? http : local,
        filename: "[name].js?name=[hash]",
        chunkFilename:  '[name]_chunk.js?name=[hash]',
    },
    module: {
        rules :[
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ["url-loader"],//,'image-webpack-loader',"url-loader"
                /*options : {
                      optimizationLevel: 7,
                }*/
            },
            /*{
                test: /\.(png|jpg|gif|svg)$/,
                use: "url-loader",
                options : {
                    limit: 15000,
                    name: '[name].[ext]?[hash]'
                }
            },*/
            /*{
                test: /\.scss$/,
                use : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ],
                    publicPath: "/build"
                })
            },*/
            /*{
                test: /\.scss$/,
                use: SASS.extract([ 'css-loader', 'sass-loader' ])
            },
            {
                test: /\.css$/,
                use: CSS.extract([ 'css-loader', 'postcss-loader' ])
            },*/
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "babel-loader"
            },
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            }
        ],
    },
    resolve:{
        modules: [
            path.join(__dirname, "/"),
            "node_modules"
        ],
        alias : {
            Vue : 'js/plug/vue.min' , 
            VueRouter : 'js/plug/vue-router.min'
        },
        extensions: ['.js', '.json', '.scss','.sass','.vue','.jsx','.css'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./', 'index.html'),  
            inject: true,
            filename: 'index.html',
            minify : {
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }),
        new webpack.ProvidePlugin({
            //Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
            $ : 'webpack-zepto',
            Vue : 'Vue',
            VueRouter : 'vue-router'
            //globalCss : '../../common/css/style/global.scss'
            //React : 'react',
            //ReactDOM : 'react-dom'
        }),
        new ExtractTextPlugin({
            filename : './[id][name].css?[hash]',
            allChunks : true
        }),
        //new ImageminWebpackPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
        /*new CommonsChunkPlugin({
            name: 'vendor', 
            //filename : 'global.js',
            //minChunks : Infinity
        })*/
    ]
};

if (build) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new CleanPlugin('./build')

  ])

}else{
  module.exports.devtool = '#source-map'
}