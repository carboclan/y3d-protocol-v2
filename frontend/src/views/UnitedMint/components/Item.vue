<template>
  <div
    class="united-mint"
    :class="opened ? 'united-mint-' + mode : ['united-mint-close', 'united-mint-' + mode]"
  >
    <u-m-item-header
      v-show="mode !== 'easy'"
      :opened="opened"
      :data="data"
      @headerClickOnToggle="handleHeaderClickOnToggle"
    />
    <transition name="open">
      <u-m-item-operating
        :mode="mode"
        :data="data"
        :userBalances="userBalances"
        v-show="opened || mode === 'easy'"
      />
    </transition>
    <transition name="open">
      <u-m-item-data
        v-show="opened && mode !== 'easy'"
        :contractData="contractData"
        :yourData="yourData"
        :data="data"
      />
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
import { /* CommonERC20, */ USDT } from '../../../contract';
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
    mode: {
      type: String,
      default: 'easy',
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
        mintedToken: this.tokenWaitingToClaim,
      };
    },
    yourData() {
      return {
        unmintedUSDT: this.userUsdtDeposit,
        // TODO: 数据错了
        unclaimedToken: '...',
        token: this.userToken,
      };
    },
    usdtWaitingToMint() {
      return this.formatPrice(this.contractStat.usdtBalance, this.userBalances.usdtDecimals);
    },
    tokenWaitingToClaim() {
      return this.formatPrice(this.contractStat.tokenBalance, this.userBalances.tokenDecimals);
    },
    usdtThatCanJustClaim() {
      return this.formatPrice(this.contractStat.mintedUsdt, this.userBalances.usdtDecimals);
    },
    userUsdtBalance() {
      return this.formatPrice(this.userBalances.usdt, this.userBalances.usdtDecimals);
    },
    userUsdtDeposit() {
      return this.formatPrice(this.userBalances.usdtInUnitedMint, this.userBalances.usdtDecimals);
    },
    userToken() {
      return this.formatPrice(this.userBalances.tokenBalance, this.userBalances.tokenDecimals);
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
      const UNI_DEPOSIT_CONTRACT = this.data.unitedMintContract.connect(getProvider());
      const [usdtBalance, tokenBalance, mintedUsdt] = await Promise.all([
        UNI_DEPOSIT_CONTRACT.unminted_USDT(),
        this.data.key === 'yYCrv'
          ? UNI_DEPOSIT_CONTRACT.minted_yyCRV()
          : UNI_DEPOSIT_CONTRACT.minted_yswUSD(),
        UNI_DEPOSIT_CONTRACT.mintedUSDT(),
      ]);
      this.contractStat = { usdtBalance, tokenBalance, mintedUsdt };
    },
    async fetchUserData() {
      const UNI_DEPOSIT_CONTRACT = this.data.unitedMintContract.connect(getProvider());
      // eslint-disable-next-line max-len
      const [USDT_TOKEN, Y_TOKEN] = [USDT, this.data.yToken].map((tokenC) => tokenC.connect(getProvider()));
      const [
        usdtBalance,
        tokenBalance,
        depositUsdtBalance,
        usdtDecimals,
        tokenDecimals,
      ] = await Promise.all([
        USDT_TOKEN.balanceOf(this.address),
        Y_TOKEN.balanceOf(this.address),
        UNI_DEPOSIT_CONTRACT.balanceOf(this.address),
        USDT_TOKEN.decimals(),
        Y_TOKEN.decimals(),
      ]);
      this.userBalances = {
        tokenBalance,
        usdt: usdtBalance,
        usdtInUnitedMint: depositUsdtBalance,
        usdtDecimals,
        tokenDecimals,
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
    this.fetchUserData();
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color.scss';
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
.united-mint-easy {
  padding: 16px 22px;
}
</style>
