import { ethers } from "ethers";
// Load process.env from dotenv
require('dotenv').config();

export const deployContract = (compilerOutput: any, ...args: any[]) => async (wallet: ethers.Wallet) => {
    const _deployingContract = await ethers.ContractFactory.fromSolidity(
        compilerOutput, wallet
    ).deploy(...args);
    return _deployingContract.deployTransaction.wait(1);
}
