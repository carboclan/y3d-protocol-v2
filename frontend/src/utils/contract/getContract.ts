/* eslint-disable arrow-body-style */

import { getProvider, getChainId } from '@/store/ethers/ethersConnect';
import {
  y3DToken,
  CommonERC20,
  multiCallAddr,
  multiCallRinkeybyAddr,
  multiCallBSCAddr,
  multiCall,
} from '@/contract';
import { Contract } from 'ethers';

const getERC20Contract = (_address: string): Contract => {
  return CommonERC20.attach(_address).connect(getProvider()!.getSigner());
};

const getY3DContract = (_y3DAddress: string): Contract => {
  return y3DToken.attach(_y3DAddress).connect(getProvider()!.getSigner());
};

const getMultiCallContract = (): Contract => {
  let addr = '';
  switch (getChainId()) {
    case '0x4':
      addr = multiCallRinkeybyAddr;
      break;
    case '0x38':
      addr = multiCallBSCAddr;
      break;
    default:
      addr = multiCallAddr;
      break;
  }
  return multiCall.attach(addr).connect(getProvider()!.getSigner());
};

export default getERC20Contract;

export {
  getY3DContract,
  getERC20Contract,
  getMultiCallContract,
};
