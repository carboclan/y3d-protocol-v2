<template>
  <div class="united-mint" :class="opened ? '' : 'united-mint-close'">
    <u-m-item-header
      :opened="opened"
      :data="data"
      @headerClickOnToggle="handleHeaderClickOnToggle"
    />
    <transition name="open">
      <u-m-item-operating :yourData="yourData" v-show="opened" />
    </transition>
    <transition name="open">
      <u-m-item-data v-show="opened" :contractData="contractData" :yourData="yourData" />
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import { BigNumber } from 'ethers';
import { mapState } from 'vuex';
import UMItemHeader from './Item/Header.vue';
import UMItemData from './Item/Data.vue';
import UMItemOperating from './Item/Operating.vue';
// eslint-disable-next-line no-unused-vars
import { getProvider, utils } from '../../../store/ethers/ethersConnect';
import { /* CommonERC20, */ UnitedMint, USDT, yyCrv } from '../../../contract';
// eslint-disable-next-line no-unused-vars
import { ContractStat, UserBalances } from '../../../interface';

export default Vue.extend({
  name: 'UnitedMintView',
  data() {
    return {
      isSendingTx: false,
      contractStat: {
        mintedUsdt: BigNumber.from(0),
      },
      userBalances: {},
    };
  },
  props: {
    data: {
      type: Object,
      default: () => null,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    itemToggle: {
      type: Function,
      defualt: () => {},
    },
  },
  components: {
    UMItemHeader,
    UMItemData,
    UMItemOperating,
  },
  computed: {
    ...mapState('ethers', ['address']),
    contractData() {
      return {
        unmintedUSDT: this.usdtWaitingToMint,
        mintedUSDT: this.usdtThatCanJustClaim,
        mintedToken: this.yyCrvWaitingToClaim,
      };
    },
    yourData() {
      return {
        unmintedUSDT: this.userUsdtBalance,
        unclaimedToken: this.userYycrv,
      };
    },
    usdtWaitingToMint() {
      return this.formatPrice(this.contractStat.usdtBalance, 6);
    },
    yyCrvWaitingToClaim() {
      return this.formatPrice(this.contractStat.yyCrvBalance, 18);
    },
    usdtThatCanJustClaim() {
      return this.formatPrice(this.contractStat.mintedUsdt, 6);
    },
    userUsdtBalance() {
      return this.formatPrice(this.userBalances.usdt, 6);
    },
    userUsdtDeposit() {
      return this.formatPrice(this.userBalances.usdtInUnitedMint, 6);
    },
    userYycrv() {
      return this.formatPrice(this.userBalances.yyCrv, 18);
    },
  },
  methods: {
    handleHeaderClickOnToggle(data) {
      this.$emit('itemToggle', data);
    },
    formatPrice(price, decimals) {
      if (!price) return '...';
      return utils.formatUnits(price, decimals);
    },
    async fetchStat() {
      const UNI_DEPOSIT_CONTRACT = UnitedMint.connect(getProvider());
      const [usdtBalance, yyCrvBalance, mintedUsdt] = await Promise.all([
        UNI_DEPOSIT_CONTRACT.unminted_USDT(),
        UNI_DEPOSIT_CONTRACT.minted_yCRV(),
        UNI_DEPOSIT_CONTRACT.mintedUSDT(),
      ]);
      this.contractStat = { usdtBalance, yyCrvBalance, mintedUsdt };
    },
    async fetchUserData() {
      const UNI_DEPOSIT_CONTRACT = UnitedMint.connect(getProvider());
      // eslint-disable-next-line max-len
      const [USDT_TOKEN, YYCRV_TOKEN] = [USDT, yyCrv].map((tokenC) => tokenC.connect(getProvider()));
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
@import "@/assets/styles/color.scss";
.open-enter-active,
.open-leave-active {
  transition: opacity 0.1s;
}
.open-enter, .open-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.united-mint-close {
  padding-bottom: 16px !important;
}
.united-mint {
  max-width: 880px;
  width: 100%;
  background-color: $um-orange-bg;
  padding: 16px 22px 48px 22px;
  border-radius: 16px;
  border: 4px solid $um-orange;
  min-height: 52px;
  margin-bottom: 48px;
}
</style>
