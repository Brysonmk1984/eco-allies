const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const plugins = [];


module.exports = env => {
  if(env === 'production'){
    plugins.push(
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({filename:'index.html', template: 'index.html'}),
      new MiniCssExtractPlugin({filename: 'assets/css/[name].[hash].css'})
    );
  }else{
    env = 'development';
    plugins.push(
      new HtmlWebpackPlugin({filename:'index.html', template: 'index.html'}),
      new webpack.HotModuleReplacementPlugin()
    );
  }
  
  
  
  return {
    context: path.join(__dirname, 'src'),
    entry: [
      'webpack-hot-middleware/client?reload=true',
      './main.js',
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath : '/',
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
              env === 'development' ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader"
          ]
        },
        {
          test: /\.(png|gif|jpg)$/,
          exclude: /node_modules/,
          use : ['file-loader?name=[name].[ext]&outputPath=assets/images/']
        },
        {
          test: /\.json$/,
          include: '/build/contracts/EcoAllyBase.json',
          use : ['json-loader']
          
        },
        { test: /\.(woff)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=[name].[ext]&publicPath=../../&outputPath=assets/font/' },
        //{ test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=[name]-[hash:6].[ext]&outputPath=assets/fonts/' },
        //{ test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=[name]-[hash:6].[ext]&outputPath=assets/fonts/' },
        // {
        //   test: /\.(eot|svg|ttf|woff|woff2)$/,
        //   exclude: /node_modules/,
        //   use : ['file-loader?name=[name]-[hash:6].[ext]&outputPath=assets/fonts/']
        // },
      ],
    },
    plugins,
    resolve: {
      alias: {
         '~' : path.resolve( __dirname, 'src' )
      },
    },
    mode: env
  }
};