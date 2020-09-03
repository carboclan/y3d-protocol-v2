import { ethers } from 'ethers';
import y3dFactoryABI from './abi/y3dFactory.json';
import y3dTokenABI from './abi/y3dToken.json';
import IERC20_ABI from './abi/IERC20.json';

export const y3dFactory = new ethers.Contract(
  process.env.VUE_APP_Y3DFACTORY,
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

/**
 * CommonERC20 Contract
 * ALERT: you would need to .attach(address) this before using it, for real!
 */
export const y3DToken = new ethers.Contract(
  '0x0000000000000000000000000000000000000000',
  y3dTokenABI,
);
