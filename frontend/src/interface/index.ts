import { BigNumber } from 'ethers';

interface ContractStat {
    usdtBalance?: BigNumber;
    yyCrvBalance?: BigNumber;
}

interface UserBalances {
    usdt?: BigNumber;
    yyCrv?: BigNumber;
}

export { ContractStat, UserBalances }