var EcoAllyCore = artifacts.require("../contracts/EcoAllyCore");

module.exports = function(deployer) {
  deployer.deploy(EcoAllyCore);
};