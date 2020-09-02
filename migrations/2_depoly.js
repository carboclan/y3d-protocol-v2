const Y3dfactory = artifacts.require("y3dfactory");

module.exports = function(deployer) {
  //deployer.deploy(Migrations);
  deployer.deploy(Y3dfactory);
};
