//const Y_3dfactory = artifacts.require("y_3dfactory");

//const route02 = artifacts.require("UniswapV2Router02");

const yUNI = artifacts.require("yUNILP");

module.exports = function(deployer) {
  //deployer.deploy(Migrations);
//  deployer.deploy(Y_3dfactory);

deployer.deploy(yUNI);

// UniswapV2Router02
};
