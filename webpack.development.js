const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const   plugins = [
  new HtmlWebpackPlugin({filename:'index.html', template: 'index.html'}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({APP_ROOT : "'/'"})
];

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './main.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath : '/',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
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
            "style-loader",
            "css-loader",
            "sass-loader"
        ]
      },
      {
        test: /\.(png|gif|jpg)$/,
        exclude: /node_modules/,
        use : ['file-loader?name=[name].[ext]&outputPath=assets/images/'],
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
  mode: 'development'
};