require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = process.env.MNEMONIC;
//const mnemonic = "leopard fold win inspire deny culture puzzle asset enrich text bronze manual";
const infuraAiKey = process.env.INFURAAPIKEY;
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  solc: {
    optimizer : {
      enabled : true,
      runs : 200
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 5777,
      //network_id: 1553119384172,
      gas : 4700000,
      gasPrice : 1
    },
    ropsten: {
      provider: function(){
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infuraAiKey}`)
      },
      //provider: new HDWalletProvider(mnemonic, `https://api.infura.io/v1/jsonrpc/ropsten/eth_blockNumber?token=${infuraAiKey}`),
      network_id: '*',
      gas: 4500000,
      gasPrice: 25000000000
    },
    kovan: {
      provider: new HDWalletProvider(mnemonic, 'https://kovan.infura.io/v3/6c7de342e43e4fb0822e25cfb49f1ea9'),
      network_id: '*',
      gas: 4500000,
      gasPrice: 25000000000
    },
    rinkeby: {
      provider: function(){
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/6c7de342e43e4fb0822e25cfb49f1ea9');
      },
      //host : "localhost",
      //port : 8545,
      network_id: 4,
      //from: '0x895B758229aFF6C0f95146A676bBF579aD7636aa',
      gas: 4500000,
      //gasPrice: 25000000000
    },
    mainnet: {
      provider: new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/v3/6c7de342e43e4fb0822e25cfb49f1ea9'),
      network_id: '*',
      gas: 4500000,
      gasPrice: 25000000000
    }
  }
};
