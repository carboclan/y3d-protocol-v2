//const Y_3dfactory = artifacts.require("y_3dfactory");

//const route02 = artifacts.require("UniswapV2Router02");

const yUniswap_ETH_USDT_LP = artifacts.require("yUniswap_ETH_USDT_LP");

module.exports = function(deployer) {
  //deployer.deploy(Migrations);
//  deployer.deploy(Y_3dfactory);

deployer.deploy(yUniswap_ETH_USDT_LP);

// UniswapV2Router02
};
