<template>
    <div class="united-mint">
      <div class="ui info icon message" style=" text-align: left; ">
        <i class="question circle outline icon"></i>
        <div class="content">
          <div class="header"> What is United Mint? </div>
          <p> TL;DR: Pooling USDT to print yyCrv. Everyone can reduce their gas consumption.</p>
        </div>
      </div>
      <div class="ui grid stackable two column container">
        <div class="eight wide column">
          <table class="ui celled striped table">
            <thead>
                <tr><th colspan="3"> Contract Overview </th>
            </tr></thead>
            <tbody>
                <tr>
                <td class="collapsing"><i class="money icon"></i> Waiting to mint yyCrv with </td>
                <td> {{ usdtWaitingToMint }} USDT </td>
                </tr>
                <tr>
                <td><i class="money icon"></i> Waiting for claim </td>
                <td> {{ yyCrvWaitingToClaim }} yyCrv </td>
                </tr>
                <tr>
                <td>
                  <i class="folder icon"></i>
                  Max. USDT to claim for yyCrv (without minting new yyCrv)
                </td>
                <td>{{ usdtThatCanJustClaim }} USDT</td>
                </tr>
            </tbody>
        </table>
        </div>
        <div class="eight wide column">
          <table class="ui celled striped table">
            <thead>
                <tr><th colspan="3"> My Wallet Stats </th>
            </tr></thead>
            <tbody>
                <tr>
                <td class="collapsing"><i class="money icon"></i> USDT Balance </td>
                <td> {{ userUsdtBalance }} USDT </td>
                </tr>
                <tr>
                <td><i class="money icon"></i> yyCrv Balance </td>
                <td> {{ userYycrv }} yyCrv </td>
                </tr>
                <tr>
                <td><i class="file icon"></i> Your Deposit in contract </td>
                <td>{{ userUsdtDeposit }} USDT</td>
                </tr>
            </tbody>
        </table>
        </div>
      </div>
      <div class="container actions">
        <button type="button" class="ui primary button"
          :disabled="isSendingTx" :class="isSendingTx && 'loading'">
          Mint
        </button>
        <button type="button"  class="ui button"
          :disabled="isSendingTx" :class="isSendingTx && 'loading'">
          Deposit
        </button>
        <button type="button" class="ui button"
          :disabled="isSendingTx" :class="isSendingTx && 'loading'">
          Claim
        </button>
      </div>
      <div class="container actions">
        <button type="button" class="ui button"
          :disabled="isSendingTx" :class="isSendingTx && 'loading'">
          Deposit, Mint & Claim At Once
        </button>
        <button type="button" class="ui button"
          :disabled="isSendingTx" :class="isSendingTx && 'loading'">
          Restore yyCrv to USDT
        </button>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import { BigNumber, BigNumberish } from 'ethers';
import { mapState } from 'vuex';
import { getProvider, utils } from '../store/ethers/ethersConnect';
import {
  /* CommonERC20, */UnitedMint, USDT, yyCrv,
} from '../contract';
// eslint-disable-next-line no-unused-vars
import { ContractStat, UserBalances } from '../interface';

interface UnitedMintViewData {
  isSendingTx: boolean
  contractStat: ContractStat
  userBalances: UserBalances
}

export default Vue.extend({
  name: 'UnitedMintView',
  data: (): UnitedMintViewData => ({
    isSendingTx: false,
    contractStat: {
      mintedUsdt: BigNumber.from(0),
    },
    userBalances: {},
  }),
  computed: {
    ...mapState('ethers', ['address']),
    usdtWaitingToMint() :string {
      return this.formatPrice(this.contractStat.usdtBalance, 6);
    },
    yyCrvWaitingToClaim() :string {
      return this.formatPrice(this.contractStat.yyCrvBalance, 18);
    },
    usdtThatCanJustClaim() :string {
      return this.formatPrice(this.contractStat.mintedUsdt, 6);
    },
    userUsdtBalance() :string {
      return this.formatPrice(this.userBalances.usdt, 6);
    },
    userUsdtDeposit() :string {
      return this.formatPrice(this.userBalances.usdtInUnitedMint, 6);
    },
    userYycrv() :string {
      return this.formatPrice(this.userBalances.yyCrv, 18);
    },
  },
  methods: {
    formatPrice(price: BigNumberish | undefined, decimals: BigNumberish): string {
      if (!price) return '...';
      return utils.formatUnits(price, decimals);
    },
    async fetchStat(): Promise<void> {
      const UNI_DEPOSIT_CONTRACT = UnitedMint.connect(getProvider()!);
      const [usdtBalance, yyCrvBalance, mintedUsdt] = await Promise.all([
        UNI_DEPOSIT_CONTRACT.unminted_USDT(),
        UNI_DEPOSIT_CONTRACT.minted_yyCRV(),
        UNI_DEPOSIT_CONTRACT.mintedUSDT(),
      ]);
      this.contractStat = { usdtBalance, yyCrvBalance, mintedUsdt };
    },
    async fetchUserData() {
      const UNI_DEPOSIT_CONTRACT = UnitedMint.connect(getProvider()!);
      const [USDT_TOKEN, YYCRV_TOKEN] = [
        USDT,
        yyCrv,
      ].map((tokenC) => tokenC.connect(getProvider()!));
      const [usdtBalance, yyCrvBalance, depositUsdtBalance] = await Promise.all([
        USDT_TOKEN.balanceOf(this.address),
        YYCRV_TOKEN.balanceOf(this.address),
        UNI_DEPOSIT_CONTRACT.balanceOf(this.address),
      ]);
      this.userBalances = {
        yyCrv: yyCrvBalance,
        usdt: usdtBalance,
        usdtInUnitedMint: depositUsdtBalance,
      };
    },
  },
  watch: {
    address(val) {
      console.log('address changed', val);
      if (val) this.fetchUserData();
    },
  },
  mounted() {
    this.fetchStat();
    if (this.address) this.fetchUserData();
  },
});
</script>

<style lang="scss" scoped>
.united-mint {
    text-align: center;
}
</style>
