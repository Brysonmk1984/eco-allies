const path = require('path');
 const webpack = require('webpack');
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './main.js',
  ],
  output: {
    path: path.join(__dirname, 'www'),
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
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development'
};