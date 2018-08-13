module.exports = (env) => {
  const wp = require(`./webpack.${env}.js`);
  return wp;
}