/* eslint-disable arrow-body-style */

import { getProvider } from '@/store/ethers/ethersConnect';
import { y3DToken, CommonERC20 } from '@/contract';
import { Contract } from 'ethers';

const getERC20Contract = (_address: string): Contract => {
  return CommonERC20.attach(_address).connect(getProvider()!.getSigner());
};

const getY3DContract = (_y3DAddress: string): Contract => {
  return y3DToken.attach(_y3DAddress).connect(getProvider()!.getSigner());
};

export default getERC20Contract;

export {
  getY3DContract,
  getERC20Contract,
};
