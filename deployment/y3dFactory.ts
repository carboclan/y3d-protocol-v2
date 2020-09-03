import { ethers } from "ethers";
import { expect } from "chai";
import { deployContract } from "./helper";
// Load process.env from dotenv
require('dotenv').config();

// checking envs
function checkEnv(name: string) {
    const _env = process.env[name];
    expect(_env).to.be.not.null;
    expect(_env).to.be.a('string', `Environment variable "${name}" Should be a string`)
}

checkEnv('InfuraId');
checkEnv('privateKey');

// Importing related complied contract code
import y_3dFactory from '../build/y_3dFactory.json';

// Use the Rinkeby testnet
const network = "rinkeby";

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = ethers.getDefaultProvider(network, {
    infura: process.env.InfuraId,
});

const wallet = new ethers.Wallet(String(process.env.privateKey), provider);

async function main() {
    console.info("=== Start to deploy y3dFactory ===")
    const result = await deployContract(y_3dFactory)(wallet);
    console.log(result);
    const factory = new ethers.Contract(result.contractAddress, y_3dFactory.abi, wallet);
    // Create a YToken based on FUSDT for testing
    const createYToken = await factory.create("0xCB9543F6A3A1De19B4A2aFE7C30C54290E5e61F4");
    const receipt = await createYToken.wait(1);
    console.log(receipt)
}

main();