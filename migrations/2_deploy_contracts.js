var DaniToken = artifacts.require("DaniToken");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(DaniToken, 1000000)
}
