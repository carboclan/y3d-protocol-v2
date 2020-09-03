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
    const result = await deployContract(y_3dFactory)(wallet);
    console.log(result);
}

main();