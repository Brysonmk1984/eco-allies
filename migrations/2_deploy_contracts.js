var EcoAllyAccessControl = artifacts.require("../contracts/EcoAllyAccessControl");
var EcoAllyBase= artifacts.require("../contracts/EcoAllyBase");
var Ownable = artifacts.require("../contracts/Ownable");
var ERC721 = artifacts.require("../contracts/ERC721");
var EcoAllyOwnership = artifacts.require("../contracts/EcoAllyOwnership");
var EcoAllyCore = artifacts.require("../contracts/EcoAllyCore");

module.exports = function(deployer) {
//   deployer.deploy(EcoAllyAccessControl);
//   deployer.deploy(EcoAllyBase);
//   deployer.deploy(Ownable);
//   deployer.deploy(ERC721);
//   deployer.deploy(EcoAllyOwnership);
  deployer.deploy(EcoAllyCore);
};