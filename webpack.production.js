const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [
  new CleanWebpackPlugin(['dist']),
  new HtmlWebpackPlugin({filename:'index.html', template: 'index.html'}),
  new MiniCssExtractPlugin({filename: 'assets/css/[name].[hash].css'}),
  new webpack.DefinePlugin({APP_ROOT : "'/eco-allies/'"})
];


module.exports = {

    context: path.join(__dirname, 'src'),
    entry: [
      './main.js',
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath : '/eco-allies/',
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
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader"
          ]
        },
        {
          test: /\.(png|gif|jpg)$/,
          exclude: /node_modules/,
          use : ['file-loader?name=[name].[ext]&publicPath=/eco-allies/assets/images/&outputPath=assets/images/'],
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.json$/,
          include: '/build/contracts/EcoAllyBase.json',
          use : ['json-loader']
          
        },
        { test: /\.(woff|ttf)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=[name].[ext]&publicPath=../../&outputPath=assets/font/' },
      ],
    },
    plugins,
    resolve: {
      alias: {
         '~' : path.resolve( __dirname, 'src' )
      }
    },
    mode: 'production'
};