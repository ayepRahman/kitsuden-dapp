const Migrations = artifacts.require("Migrations");
const KitsudenFoxfone = artifacts.require("KitsudenFoxfone");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KitsudenFoxfone);
};
