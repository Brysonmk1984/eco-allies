module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7546,
      network_id: "*",
      gas : 4700000,
      gasPrice : 1
    }
  }
};
