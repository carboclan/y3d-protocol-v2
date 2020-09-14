/* eslint-disable indent */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

import { ethers } from 'ethers';
import { getProvider, getWallet, getWalletAddress } from '@/store/ethers/ethersConnect';
import IERC20_ABI from './abi/IERC20.json';
import UnitedMintABI from './abi/UnitedMint.json';
import { usdtAddr, yyCrvAddr } from './index';

// #region Mint Functions
const uniDepositContract_deposit_n_claim = async function (amount) {
  const signer = getProvider().getSigner();
  getWallet();
  const address = await getWalletAddress();
  const USDT_TOKEN_SIGNED = new ethers.Contract(usdtAddr, IERC20_ABI, signer);
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(yyCrvAddr, UnitedMintABI, signer);
  const currentUSDT = ethers.utils.parseUnits(amount, 6);
  const allowedUSDT = await USDT_TOKEN_SIGNED.allowance(address, yyCrvAddr);

  let allow = Promise.resolve();

  if (allowedUSDT.lt(currentUSDT)) {
    allow = USDT_TOKEN_SIGNED.approve(yyCrvAddr, ethers.constants.MaxUint256)
      .then((t) => getProvider().waitForTransaction(t.hash))
      .catch(() => {
        alert('Try resetting your approval to 0 first');
      });
  }

  if (currentUSDT.gt(0)) {
    allow
      .then(async () => {
        UNI_DEPOSIT_SIGNED.depositAndClaim(currentUSDT)
          .then((t) => {
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

const uniDepositContract_deposit_amount = async function (amount) {
  const signer = getProvider().getSigner();
  getWallet();
  const address = await getWalletAddress();
  const USDT_TOKEN_SIGNED = new ethers.Contract(usdtAddr, IERC20_ABI, signer);
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(yyCrvAddr, UnitedMintABI, signer);
  const currentUSDT = ethers.utils.parseUnits(amount, 6);
  const allowedUSDT = await USDT_TOKEN_SIGNED.allowance(address, yyCrvAddr);
  let allow = Promise.resolve();
  if (allowedUSDT.lt(currentUSDT)) {
    allow = USDT_TOKEN_SIGNED.approve(yyCrvAddr, ethers.constants.MaxUint256)
      .then((t) => getProvider().waitForTransaction(t.hash))
      .catch(() => {
        alert('Try resetting your approval to 0 first');
      });
  }
  if (currentUSDT.gt(0)) {
    allow
      .then(async () => {
        UNI_DEPOSIT_SIGNED.deposit(currentUSDT)
          .then((t) => {
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

const uniDepositContract_mint = async function () {
  const signer = getProvider().getSigner();
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(yyCrvAddr, UnitedMintABI, signer);
  const currentUnmintedUsdt = await UNI_DEPOSIT_SIGNED.unminted_USDT();

  if (currentUnmintedUsdt > 0) {
    UNI_DEPOSIT_SIGNED.mint()
      .then((t) => getProvider().waitForTransaction(t.hash))
      .catch(() => {});
  } else {
    alert('Current have no USDT for yCrv to mint!!');
  }
};

const uniDepositContract_claim = async function () {
  const signer = getProvider().getSigner();
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(yyCrvAddr, UnitedMintABI, signer);
  const currentMinted_yyCrv = await UNI_DEPOSIT_SIGNED.minted_yyCRV();
  if (currentMinted_yyCrv > 0) {
    UNI_DEPOSIT_SIGNED.claim()
      .then((t) => getProvider().waitForTransaction(t.hash))
      .catch(() => {});
  } else {
    alert('Current there are no yyCrv to claim!!');
  }
};

const uniDepositContract_restore_amount = async function (amount) {
  const signer = getProvider().getSigner();
  getWallet();
  const address = await getWalletAddress();
  const UNI_DEPOSIT_CONTRACT = new ethers.Contract(yyCrvAddr, UnitedMintABI, signer);
  const yyCrvTokenAddr = await UNI_DEPOSIT_CONTRACT.yyCrv();
  const yyCrv_TOKEN_SIGNED = new ethers.Contract(yyCrvTokenAddr, IERC20_ABI, signer);
  const UNI_DEPOSIT_SIGNED = new ethers.Contract(yyCrvAddr, UnitedMintABI, signer);

  const current_yyCrv = ethers.utils.parseUnits(amount, 18);
  const allowed_yCrv = await yyCrv_TOKEN_SIGNED.allowance(address, yyCrvAddr);

  let allow = Promise.resolve();

  if (allowed_yCrv.lt(current_yyCrv)) {
    allow = yyCrv_TOKEN_SIGNED
      .approve(yyCrvAddr, ethers.constants.MaxUint256)
      .then((t) => getProvider().waitForTransaction(t.hash))
      .catch(() => {
        alert('Try resetting your approval to 0 first');
      });
  }

  if (current_yyCrv.gt(0)) {
    allow
      .then(async () => {
        UNI_DEPOSIT_SIGNED.restore(current_yyCrv)
          .then((t) => {
            getProvider()
              .waitForTransaction(t.hash)
              .then(() => {
              });
          })
          .catch(() => {
          });
      })
      .catch(() => {
      });
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
