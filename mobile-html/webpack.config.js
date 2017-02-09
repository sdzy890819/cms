var webpack = require('webpack')
    ,path = require('path')
    ,HtmlWebpackPlugin = require('html-webpack-plugin')
    ,CleanPlugin = require('clean-webpack-plugin')
    ,ExtractTextPlugin = require("extract-text-webpack-plugin")
    ,CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
    ,build =  process.env.NODE_ENV === 'build'
    ,local = ''
    ,http = ''; 

const extractSCSS = new ExtractTextPlugin('stylesheets/[name].less');

module.exports = {
    entry: './js/main.js',
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
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "babel-loader"
            }
        ],
    },
    resolve:{
        modules: [
            path.join(__dirname, "/"),
            "node_modules"
        ],
        extensions: ['.js', '.json', '.scss','.sass','.vue','.jsx','.css'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./', 'index.html'),  
            inject: 'body',
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
        })
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