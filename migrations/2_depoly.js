const Y_3dfactory = artifacts.require("y_3dfactory");

const route02 = artifacts.require("UniswapV2Router02");

module.exports = function(deployer) {
  //deployer.deploy(Migrations);
//  deployer.deploy(Y_3dfactory);

deployer.deploy(route02);

// UniswapV2Router02
};
