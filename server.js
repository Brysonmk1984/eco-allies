const path = require("path");
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js')();
const app = express();
 
const compiler = webpack(webpackConfig);

//app.use(express.static(__dirname + '/src/devIndex.html'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler, {
    'log': false, 
    'path': '/__webpack_hmr', 
    'heartbeat': 10 * 1000
}));

app.get('/*', function(req, res) {
  //console.log(`${webpackConfig.output.publicPath}dist/index.html`);
  res.sendFile(path.join(__dirname, `${webpackConfig.output.publicPath}dist/index.html`), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});