const Migrations = artifacts.require("Migrations");
const OnlyAyep = artifacts.require("OnlyAyep");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(OnlyAyep);
};
