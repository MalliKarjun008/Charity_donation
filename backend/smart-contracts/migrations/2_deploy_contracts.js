const Charity = artifacts.require("Charity");

module.exports = function (deployer) {
  deployer.deploy(Charity, "Global Charity Foundation");
};