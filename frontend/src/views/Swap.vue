/* eslint-disable max-len */
<template>
  <div class="container">
    <div class="content-box">
      <div id="swap-page" class="swap-page">
        <div class="sp-content">
          <TokenAmountInput
            :isTokenSelected="!!tokenAInfo"
            :tokenInfo="tokenAInfo"
            :tokenLogo="tokenIcon"
            @select-token="selectTokenA"
            @amount-changed="tokenAAmountChanged"
          >
            <template v-slot:title>
              From
            </template>
          </TokenAmountInput>
          <SplitLine>
            <arrow-down-icon size="1.5x" class="sac-icon"></arrow-down-icon>
          </SplitLine>
          <TokenAmountInput
            :isTokenSelected="!!tokenBInfo"
            :tokenInfo="tokenBInfo"
            tokenLogo="https://1inch.exchange/assets/tokens/0x960b236a07cf122663c4303350609a66a7b288c0.png"
            @select-token="selectTokenB"
            @amount-changed="tokenBAmountChanged"
          >
            <template v-slot:title>
              To
            </template>
          </TokenAmountInput>
          <div class="swap-info">
            <div class="info-content" v-if="swapPrice.B.symbol">
              <div class="sc-content">
                <div class="scc-text">Price</div>
                <div class="scc-text">
                  {{ swapPrice.B.price }} {{ tokenAInfo.symbol }} per {{ tokenBInfo.symbol }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swap-button-content">
          <MainButton id="swap-button" disabled>Enter an amount</MainButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TokenAmountInput from '@/components/TokenAmountInput.vue';
import { priceCalculator } from '@/helpers/utils';
import { utils } from '@/store/ethers/ethersConnect';
import MainButton from '@/components/MainButton.vue';
import SplitLine from '@/components/SplitLine.vue';

export default {
  components: {
    TokenAmountInput,
    SplitLine,
    MainButton,
  },
  data() {
    return {
      tokenIcon: 'data:image/png;base64,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',
      waitForLogin: 0,
      pair: '',
      // use TRX as default token A
      tokenA: 'TRX',
      tokenB: '',
      tokenAInfo: {
        // use TRX as default
        symbol: 'TRX',
        balance: '0',
        decimals: 6,
      },
      tokenBInfo: null,
      reserves: null,
      tokenAAmount: '',
      tokenBAmount: '',
      exactIn: 'A',
    };
  },
  computed: {
    ...mapState(['tronweb']),
    isPairExist() {
      return Boolean(false);
    },
    isBtnDisabled() {
      return !(this.tokenAAmount && this.tokenBAmount);
    },
    workMode() {
      // Uniswap 有6种swap，问你怕不怕 - Frank
      const { tokenA, tokenB, exactIn } = this;
      if (tokenA !== 'TRX' && tokenB !== 'TRX') {
        return exactIn === 'A' ? 'swapExactTokensForTokens' : 'swapTokensForExactTokens';
      }
      if (tokenA === 'TRX' && tokenB !== 'TRX') {
        return exactIn === 'A' ? 'swapExactETHForTokens' : 'swapETHForExactTokens';
      }
      return exactIn === 'A' ? 'swapExactTokensForETH' : 'swapTokensForExactETH';
    },
    readableReserveData() {
      return { reserveA: '...', reserveB: '...', time: '...' };
    },
    tokenAddress() {
      const [A, B] = [this.tokenA, this.tokenB];
      return { A, B };
    },
    addLiquidityPrice() {
      if (!this.reserves || !this.tokenAInfo || !this.tokenBInfo) {
        return {
          A: { price: '...', symbol: '...' },
          B: { price: '...', symbol: '...' },
        };
      }
      const { BigNumber } = window.tronWeb;
      const {
        reserves, tokenB, tokenAInfo, tokenBInfo,
      } = this;
      const reserveA = reserves[this.tokenA];
      const reserveB = reserves[tokenB];
      const priceA = new BigNumber(reserveB).div(reserveA);
      const priceB = new BigNumber(reserveA).div(reserveB);
      const prices = priceCalculator(
        priceA.toString(),
        priceB.toString(),
        tokenAInfo.decimals,
        tokenBInfo.decimals,
      );
      const A = { price: prices.A.toString(), symbol: tokenAInfo.symbol };
      const B = { price: prices.B.toString(), symbol: tokenBInfo.symbol };
      return { A, B };
    },
    swapPrice() {
      if (!this.reserves || !this.tokenAAmount || !this.tokenBAmount) {
        return {
          A: { price: '...', symbol: null },
          B: { price: '...', symbol: null },
        };
      }
      const { BigNumber } = window.tronWeb;
      const {
        tokenAAmount, tokenBAmount, tokenAInfo, tokenBInfo,
      } = this;
      const tokenA = utils.parseUnits(tokenAAmount, tokenAInfo.decimals);
      const tokenB = utils.parseUnits(tokenBAmount, tokenBInfo.decimals);
      console.log('tokenA', tokenA.toString());
      console.log('tokenB', tokenB.toString());
      const priceA = new BigNumber(tokenB.toString()).div(tokenA.toString());
      const priceB = new BigNumber(tokenA.toString()).div(tokenB.toString());
      const prices = priceCalculator(
        priceA.toString(),
        priceB.toString(),
        tokenAInfo.decimals,
        tokenBInfo.decimals,
      );
      const A = { price: prices.A.toString(), symbol: tokenAInfo.symbol };
      const B = { price: prices.B.toString(), symbol: tokenBInfo.symbol };
      return { A, B };
    },
  },
  watch: {
    tokenA(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal === 'TRX') {
          this.checkTrx().then((res) => {
            this.tokenAInfo = res;
          });
        } else {
          this.updateTrc20Info('A');
        }
      }
      this.checkIsPairExist();
    },
    tokenB(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal === 'TRX') {
          this.checkTrx().then((res) => {
            this.tokenBInfo = res;
          });
        } else {
          this.updateTrc20Info('B');
        }
      }
      this.checkIsPairExist();
    },
  },
  methods: {
    async checkTrx() {
      return { symbol: 'TRX', balance: 0, decimals: 6 };
    },
    async checkTokensInfo() {
      console.log(this.workMode);
      const { workMode } = this;
      const isTokenATrx = workMode === 'swapETHForExactTokens' || 'swapExactETHForTokens';
      if (this.tokenA && isTokenATrx) {
        this.tokenAInfo = await this.checkTrx();
      } else {
        this.tokenAInfo = await this.getFactsOfTrc20(this.tokenA);
      }
      // If token b is not selected, do nothing
      if (!this.tokenB) return;
      const isTokenBTrx = workMode === 'swapTokensForExactETH' || workMode === 'swapExactTokensForETH';
      if (this.tokenB && !isTokenBTrx) {
        this.tokenBInfo = await this.getFactsOfTrc20(this.tokenB);
      } else {
        this.tokenBInfo = await this.checkTrx();
      }
    },
    async getFactsOfTrc20(_addr) {
      console.log(_addr);
      // const user = this.tronweb.account || window.tronWeb.defaultAddress.base58;
      return null; // await getTrc20Detail(_addr, user);
    },
    async updateTrc20Info(whichToken) {
      const facts = await this.getFactsOfTrc20(whichToken === 'A' ? this.tokenA : this.tokenB);
      if (whichToken === 'A') this.tokenAInfo = facts;
      else this.tokenBInfo = facts;
    },
    checkIsPairExist() {},
    fillMax(field, value) {
      this[field] = value;
    },
    fetchPair() {},
    getPairInfo() {},
    selectTokenA(payload) {
      console.log('selectTokenA', payload);
      this.tokenA = payload.address;
    },
    selectTokenB(payload) {
      console.log('selectTokenB', payload);
      this.tokenB = payload.address;
    },
    tokenAAmountChanged() {},
    tokenBAmountChanged() {},
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.swap-page {
  position: relative;
  margin-top: 30px;
}
.sp-content {
  display: grid;
  grid-auto-rows: auto;
  row-gap: 12px;
  box-sizing: border-box;
}

.sac-icon {
  padding: 2px;
  width: 16px;
  height: 16px;
  color: #c3c5cb;
}

.swap-button-content {
  margin: 1rem 0 0 0;
  line-height: inherit;
  box-sizing: border-box;
  min-width: 0px;
  appearance: none;
  #swap-button {
    margin-top: 16px;
  }
}
.swap-info {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  padding: 0.25rem 0.75rem 0px;
  border-radius: 20px;
}
.info-content {
  display: grid;
  grid-auto-rows: auto;
  row-gap: 4px;
}
.sc-content {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.scc-text {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
  font-size: 14px;
  color: rgb(195, 197, 203);
}
</style>
