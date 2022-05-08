const Migrations = artifacts.require("Migrations");
const Kitsuden = artifacts.require("Kitsuden");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Kitsuden);
};
