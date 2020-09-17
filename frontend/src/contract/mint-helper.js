/* eslint-disable */

import { ethers } from 'ethers';
import { getProvider, getWallet, getWalletAddress } from '@/store/ethers/ethersConnect';
import IERC20_ABI from './abi/IERC20.json';
import { usdtContractAddr } from './index';

// #region Mint Functions
const uniDepositContract_deposit_n_claim = async function(amount, toeknData) {
  const signer = getProvider().getSigner();
  getWallet();
  const address = await getWalletAddress();
  const USDT_TOKEN_SIGNED = new ethers.Contract(usdtContractAddr, IERC20_ABI, signer);
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(
    toeknData.unitedMintContractAddr,
    toeknData.unitedMintContractABI,
    signer
  );
  const decimals = await USDT_TOKEN_SIGNED.decimals();
  const currentUSDT = ethers.utils.parseUnits(amount, decimals);
  const allowedUSDT = await USDT_TOKEN_SIGNED.allowance(address, toeknData.unitedMintContractAddr);

  let allow = Promise.resolve();

  if (allowedUSDT.lt(currentUSDT)) {
    allow = USDT_TOKEN_SIGNED.approve(toeknData.unitedMintContractAddr, ethers.constants.MaxUint256)
      .then(t => getProvider().waitForTransaction(t.hash))
      .catch(() => {
        alert('Try resetting your approval to 0 first');
      });
  }

  if (currentUSDT.gt(0)) {
    allow
      .then(async () => {
        UNI_DEPOSIT_SIGNED.depositAndClaim(currentUSDT)
          .then(t => {
            getProvider()
              .waitForTransaction(t.hash)
              .then(() => {});
          })
          .catch(() => {});
      })
      .catch(() => {});
  } else {
    alert('You have no tokens to deposit!!');
  }
};

const uniDepositContract_deposit_amount = async function(amount, toeknData) {
  const signer = getProvider().getSigner();
  getWallet();
  const address = await getWalletAddress();
  const USDT_TOKEN_SIGNED = new ethers.Contract(usdtContractAddr, IERC20_ABI, signer);
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(
    toeknData.unitedMintContractAddr,
    toeknData.unitedMintContractABI,
    signer
  );
  const decimals = await USDT_TOKEN_SIGNED.decimals();
  const currentUSDT = ethers.utils.parseUnits(amount, decimals);
  const allowedUSDT = await USDT_TOKEN_SIGNED.allowance(address, toeknData.unitedMintContractAddr);
  let allow = Promise.resolve();
  if (allowedUSDT.lt(currentUSDT)) {
    allow = USDT_TOKEN_SIGNED.approve(toeknData.unitedMintContractAddr, ethers.constants.MaxUint256)
      .then(t => getProvider().waitForTransaction(t.hash))
      .catch(() => {
        alert('Try resetting your approval to 0 first');
      });
  }
  if (currentUSDT.gt(0)) {
    allow
      .then(async () => {
        UNI_DEPOSIT_SIGNED.deposit(currentUSDT)
          .then(t => {
            getProvider()
              .waitForTransaction(t.hash)
              .then(() => {});
          })
          .catch(() => {});
      })
      .catch(() => {});
  } else {
    alert('You have no tokens to deposit!!');
  }
};

const uniDepositContract_mint = async function(toeknData) {
  const signer = getProvider().getSigner();
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(
    toeknData.unitedMintContractAddr,
    toeknData.unitedMintContractABI,
    signer
  );
  const currentUnmintedUsdt = await UNI_DEPOSIT_SIGNED.unminted_USDT();

  if (currentUnmintedUsdt > 0) {
    UNI_DEPOSIT_SIGNED.mint()
      .then(t => getProvider().waitForTransaction(t.hash))
      .catch(() => {});
  } else {
    alert(`Current have no USDT for ${toeknData.key} to mint!!`);
  }
};

const uniDepositContract_claim = async function(toeknData) {
  const signer = getProvider().getSigner();
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(
    toeknData.unitedMintContractAddr,
    toeknData.unitedMintContractABI,
    signer
  );
  const currentMinted_token =
    toeknData.key === 'yYCrv'
      ? await UNI_DEPOSIT_SIGNED.minted_yyCRV()
      : await UNI_DEPOSIT_SIGNED.minted_yswUSD();
  if (currentMinted_token > 0) {
    UNI_DEPOSIT_SIGNED.claim()
      .then(t => getProvider().waitForTransaction(t.hash))
      .catch(() => {});
  } else {
    alert(`Current there are no ${toeknData.key} to claim!!`);
  }
};

const uniDepositContract_restore_amount = async function(amount, toeknData) {
  const signer = getProvider().getSigner();
  getWallet();
  const address = await getWalletAddress();
  const UNI_DEPOSIT_CONTRACT = new ethers.Contract(
    toeknData.unitedMintContractAddr,
    toeknData.unitedMintContractABI,
    signer
  );
  const yTokenAddr =
    toeknData.key === 'yYCrv'
      ? await UNI_DEPOSIT_CONTRACT.yyCrv()
      : await UNI_DEPOSIT_CONTRACT.yswUSD();
  const y_TOKEN_SIGNED = new ethers.Contract(yTokenAddr, IERC20_ABI, signer);
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(
    toeknData.unitedMintContractAddr,
    toeknData.unitedMintContractABI,
    signer
  );
  const decimals = await y_TOKEN_SIGNED.decimals();
  const current_token = ethers.utils.parseUnits(amount, decimals);
  const allowed_token = await y_TOKEN_SIGNED.allowance(address, toeknData.unitedMintContractAddr);

  let allow = Promise.resolve();

  if (allowed_token.lt(current_token)) {
    allow = y_TOKEN_SIGNED
      .approve(toeknData.unitedMintContractAddr, ethers.constants.MaxUint256)
      .then(t => getProvider().waitForTransaction(t.hash))
      .catch(() => {
        alert('Try resetting your approval to 0 first');
      });
  }

  if (current_token.gt(0)) {
    allow
      .then(async () => {
        UNI_DEPOSIT_SIGNED.restore(current_token)
          .then(t => {
            getProvider()
              .waitForTransaction(t.hash)
              .then(() => {});
          })
          .catch(() => {});
      })
      .catch(() => {});
  } else {
    alert('You have no tokens to restore!!');
  }
};
// #endregion Mint Functions

export default {
  uniDepositContract_deposit_amount,
  uniDepositContract_mint,
  uniDepositContract_claim,
  uniDepositContract_deposit_n_claim,
  uniDepositContract_restore_amount,
};
