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
      filename: 'bundle.js',
      publicPath: '/'
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
          //loader : 'file-loader?name=[name]-[hash:6].[ext]&outputPath=assets/images/'
          use : ['file-loader?name=[name]-[hash:6].[ext]&outputPath=assets/images/']
        },
      ],
    },
    plugins,
    mode: env
  }
};