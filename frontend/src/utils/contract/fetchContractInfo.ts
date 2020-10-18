/* eslint no-underscore-dangle: ["error", { "allow": ["_u", "_y", "_fee"] }] */
import { utils } from '@/store/ethers/ethersConnect';
import { BigNumber, BigNumberish, Bytes } from 'ethers';
import { getERC20Contract, getMultiCallContract, getY3DContract } from './getContract';

export interface IERC20DetailInfo {
  address: string
  name: string
  symbol: string
  totalSupply: BigNumberish
  decimals: string | number | BigNumber | Bytes
  balance: BigNumberish
  dBalance: string
  pool: BigNumberish
  fee: BigNumberish
}

export interface IYTokenDetailInfo extends IERC20DetailInfo {
  underlying: string
}

export interface IUTokenDetailInfo extends IERC20DetailInfo {
  address: string
}

const fetchERC20Detail = async (
  erc20ContractAddress: string,
  userAddress: string,
): Promise<IERC20DetailInfo> => {
  const result: IERC20DetailInfo = {
    address: erc20ContractAddress,
    name: '',
    symbol: '',
    totalSupply: '',
    decimals: '',
    balance: BigNumber.from('0'),
    dBalance: '',
    pool: BigNumber.from('0'),
    fee: BigNumber.from('0'),
  };
  const contract = getERC20Contract(erc20ContractAddress);

  const [_, res] = await getMultiCallContract().callStatic.aggregate([
    [contract.address, contract.interface.encodeFunctionData('name', [])],
    [contract.address, contract.interface.encodeFunctionData('symbol', [])],
    [contract.address, contract.interface.encodeFunctionData('decimals', [])],
  ]);
  // name
  try {
    const name = contract.interface.decodeFunctionResult('name', res[0]).toString();
    result.name = name;
  } catch (err) {
    const name = utils.parseBytes32String(res[0]);
    result.name = name;
    console.log(`Result data parsing failed: ${err}`);
  }
  // symbol
  try {
    const symbol = contract.interface.decodeFunctionResult('symbol', res[1]).toString();
    result.symbol = symbol;
  } catch (err) {
    const symbol = utils.parseBytes32String(res[1]);
    result.symbol = symbol;
    console.log(`Result data parsing failed: ${err}`);
  }
  // pool fee
  try {
    const y3dContract = getY3DContract(erc20ContractAddress);
    result.pool = await y3dContract.pool();
    result.fee = await y3dContract._fee();
  } catch (err) {
    //
  }

  result.decimals = await contract.decimals();
  result.totalSupply = await contract.totalSupply();
  if (userAddress && userAddress !== '') {
    result.balance = await contract.balanceOf(userAddress);
  }
  result.dBalance = utils.formatUnits(result.balance, result.decimals);
  return result;
};

export default fetchERC20Detail;

export {
  fetchERC20Detail,
};
