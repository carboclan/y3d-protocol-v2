import { ethers } from 'ethers';
import y3dFactoryABI from './abi/y3dFactory.json';
import y3dTokenABI from './abi/y3dToken.json';
import IERC20_ABI from './abi/IERC20.json';
import yyCrvUnitedMintABI from './abi/yyCrvUnitedMint.json';
import yswUSDUnitedMintABI from './abi/yswUSDUnitedMint.json';
import multiCallAbi from './abi/MulticallAbi.json';

export const y3dFactory = new ethers.Contract(
  process.env.VUE_APP_Y3DFACTORY as string,
  y3dFactoryABI,
);

/**
 * CommonERC20 Contract
 * ALERT: you would need to .attach(address) this before using it, for real!
 */
export const CommonERC20 = new ethers.Contract(
  '0x0000000000000000000000000000000000000000',
  IERC20_ABI,
);

export const multiCall = new ethers.Contract(
  '0x0000000000000000000000000000000000000000',
  multiCallAbi,
);

export const USDT = CommonERC20.attach('0xdac17f958d2ee523a2206206994597c13d831ec7');
export const yyCrv = CommonERC20.attach('0x199ddb4bdf09f699d2cf9ca10212bd5e3b570ac2');
export const yswUSD = CommonERC20.attach('0x2b1120F0C8238C098C767282092D49d9ac527e8C');

/**
 * CommonERC20 Contract
 * ALERT: you would need to .attach(address) this before using it, for real!
 */
export const y3DToken = new ethers.Contract(
  '0x0000000000000000000000000000000000000000',
  y3dTokenABI,
);

export const usdtContractAddr = '0xdac17f958d2ee523a2206206994597c13d831ec7';
export const yyCrvUMContractAddr = '0x65a58b7725580fD83F92B0B22fc074BE7c610e78';
export const yswUSDUMContractAddr = '0x38d1D1d6F136c4D3D696E4d72748853Be2D5751B';
export const multiCallAddr = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441';

export const yyCrvUnitedMint = new ethers.Contract(
  yyCrvUMContractAddr,
  yyCrvUnitedMintABI,
);

export const yswUSDUnitedMint = new ethers.Contract(
  yswUSDUMContractAddr,
  yswUSDUnitedMintABI,
);

export const cYyCrvUnitedMintABI = yyCrvUnitedMintABI;
export const cYswUSDUnitedMintABI = yswUSDUnitedMintABI;
