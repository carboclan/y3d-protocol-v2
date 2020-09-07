import { BigNumber } from 'ethers';

interface ContractStat {
    usdtBalance?: BigNumber;
    yyCrvBalance?: BigNumber;
    mintedUsdt: BigNumber
}

interface UserBalances {
    usdt?: BigNumber;
    yyCrv?: BigNumber;
    usdtInUnitedMint?: BigNumber;
}

export { ContractStat, UserBalances };
