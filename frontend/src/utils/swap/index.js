import { utils } from '@/store/ethers/ethersConnect';

// shares/totalSupply = amount/pool

const dealstakey3d = (totalSupply, pool, amount) => {
  try {
    const shares = utils
      .parseEther(amount)
      .mul(totalSupply)
      .div(pool);
    const r = utils.formatEther(shares).toString();
    return r;
  } catch (err) {
    return null;
  }
};

const dealstakeu = (totalSupply, pool, shares) => {
  try {
    const amount = utils
      .parseEther(shares)
      .mul(pool)
      .div(totalSupply);
    const r = utils.formatEther(amount).toString();
    return r;
  } catch (err) {
    return null;
  }
};

const dealunstakey3d = (totalSupply, pool, shares, fee) => {
  try {
    let amount = utils
      .parseEther(shares)
      .mul(pool)
      .div(totalSupply);
    amount = amount.sub(amount.mul(fee).div(1000));
    const r = utils.formatEther(amount).toString();
    return r;
  } catch (err) {
    return null;
  }
};

const dealunstakeu = (totalSupply, pool, amount, fee) => {
  try {
    const tamount = amount / (1 - fee / 1000.0);
    const shares = utils
      .parseEther(`${tamount}`)
      .mul(totalSupply)
      .div(pool);
    const r = utils.formatEther(shares).toString();
    return r;
  } catch (err) {
    return null;
  }
};

export default {
  dealstakey3d,
  dealstakeu,
  dealunstakey3d,
  dealunstakeu,
};
