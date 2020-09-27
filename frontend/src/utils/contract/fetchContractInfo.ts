import { utils } from '@/store/ethers/ethersConnect';
import { BigNumber, BigNumberish, Bytes } from 'ethers';
import { getERC20Contract } from './getContract';

export interface IERC20DetailInfo {
  name: string
  symbol: string
  totalSupply: BigNumberish
  decimals: string | number | BigNumber | Bytes
  balance: BigNumberish
  dBalance: string
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
  try {
    const contract = getERC20Contract(erc20ContractAddress);
    const [name, symbol, totalSupply, decimals, balance] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.totalSupply(),
      contract.decimals(),
      userAddress && userAddress !== '' ? contract.balanceOf(userAddress) : 0,
    ]);
    const dBalance = utils.formatUnits(balance, decimals);
    return {
      name,
      symbol,
      totalSupply,
      decimals,
      balance,
      dBalance,
    };
  } catch (err) {
    return {
      name: '',
      symbol: '',
      totalSupply: '',
      decimals: '',
      balance: '',
      dBalance: '',
    };
  }
};

export default fetchERC20Detail;

export {
  fetchERC20Detail,
};
