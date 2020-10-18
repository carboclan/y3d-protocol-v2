<template>
  <LayoutY3DV2>
    <div class="container">
      <div class="content-box">
        <div id="swap-page" class="swap-page">
          <div class="sp-content">
            <TokenAmountInput
              :isTokenSelected="!!tokenAInfo && tokenA !== ''"
              :tokenInfo="tokenAInfo"
              :tokenLogo="tokenAInfo && tokenAInfo.tag === 'y3dToken' ? ''  : tokenIcon"
              @select-token="selectTokenA"
              @clear-select-token="clearSelectTokenA"
              @amount-changed="tokenAAmountChanged"
              @isBadInputChange="tokenAIsBadInputChange"
              :tokenAmount="tokenAAmount"
              :isUToken="uTokenIndexTag === 'A'"
              :pairList="pairList"
              :otherTokenInfo="tokenBInfo"
            >
              <template v-slot:title>
                {{ uTokenIndexTag === 'A' ? $t('swap.stake') : $t('swap.unstake') }}
              </template>
            </TokenAmountInput>
            <SplitLine class="split-line">
              <arrow-down-icon
                @click="clickOnSwitch"
                size="1.5x"
                class="sac-icon"
              ></arrow-down-icon>
              <p @click="clickOnSwitch">{{ $t('swap.changePath') }}</p>
            </SplitLine>
            <TokenAmountInput
              :isTokenSelected="!!tokenBInfo && tokenB !== ''"
              :tokenInfo="tokenBInfo"
              :tokenLogo="tokenBInfo && tokenBInfo.tag === 'y3dToken' ? ''  : tokenIcon"
              @select-token="selectTokenB"
              @clear-select-token="clearSelectTokenB"
              @amount-changed="tokenBAmountChanged"
              :tokenAmount="tokenBAmount"
              :isToToken="true"
              :isUToken="uTokenIndexTag === 'B'"
              :pairList="pairList"
              :otherTokenInfo="tokenAInfo"
            >
              <template v-slot:title>
                {{ uTokenIndexTag === 'A' ? $t('swap.mint') : $t('swap.withdraw') }}
              </template>
            </TokenAmountInput>
            <!-- <div class="swap-info">
            <div class="info-content" v-if="swapPrice.B.symbol">
              <div class="sc-content">
                <div class="scc-text">Price</div>
                <div class="scc-text">
                  {{ swapPrice.B.price }} {{ tokenAInfo.symbol }} per {{ tokenBInfo.symbol }}
                </div>
              </div>
            </div>
          </div> -->
          </div>
          <div class="swap-button-content">
            <MainButton v-if="tokenAInfo && !isPairExist"
              id="create-y3d-token-button"
              @click="goToCreateY3dToken"
            >
              {{ $t('swap.toCreateToken') }}
            </MainButton>
            <MainButton
              v-else
              :btnLoading="isSendingTx"
              id="swap-button"
              :disabled="isBtnDisabled"
              @click="clickActionButton">{{
              tipText
            }}</MainButton>
            <!-- <router-link :to="createUrl" v-if="tokenAInfo && !isPairExist">
              <p>Go to create y3dToken</p>
            </router-link> -->
          </div>
        </div>
      </div>
    </div>
  </LayoutY3DV2>
</template>

<script>
import { mapState } from 'vuex';
import TokenAmountInput from '@/components/TokenAmountInput.vue';
import { getProvider, utils } from '@/store/ethers/ethersConnect';
import MainButton from '@/components/MainButton.vue';
import SplitLine from '@/components/SplitLine.vue';
import LayoutY3DV2 from '@/layouts/LayoutY3DV2.vue';
import { CommonERC20, y3DToken } from '@/contract';
import { fetchERC20Detail } from '@/utils/contract/fetchContractInfo';
import swaputil from '@/utils/swap/index';

export default {
  components: {
    LayoutY3DV2,
    TokenAmountInput,
    SplitLine,
    MainButton,
  },
  data() {
    return {
      tokenIcon: this.logo,
      waitForLogin: 0,
      pair: '',
      tokenA: '',
      tokenB: '',
      payloadTokenA: null,
      payloadTokenB: null,
      tokenAInfo: null,
      uTokenIndexTag: 'A',
      tokenBInfo: null,
      reserves: null,
      tokenAAmount: '',
      tokenBAmount: '',
      exactIn: 'A',
      tokenAIsBadInput: false,
      isSendingTx: false,
    };
  },
  computed: {
    ...mapState('ethers', ['address', 'network']),
    ...mapState('swap', ['tokensInfo', 'pairList', 'uTokenList', 'y3dTokenList', 'logo']),
    createUrl() {
      if (this.tokenAInfo.tag === 'uToken') {
        if (this.tokenAInfo && this.tokenAInfo.address) {
          return `/create?token=${this.tokenAInfo.address}`;
        }
      }
      if (this.tokenBInfo && this.tokenBInfo.address) {
        return `/create?token=${this.tokenBInfo.address}`;
      }
      return '';
    },
    tipText() {
      if (this.tokenAInfo && !this.isPairExist) {
        return this.$t('swap.tipToCreateToken');
      }
      if (!this.tokenAInfo || !this.tokenBInfo) {
        return this.$t('swap.enterAmount');
      }
      if (!this.isPairExist) {
        return this.$t('swap.tipToCreateToken');
      }
      if (!this.tokenAAmount || !this.tokenBAmount) {
        return this.$t('swap.enterAmount');
      }
      if (this.tokenAIsBadInput) {
        return this.$t(
          'swap.insufficientBalance',
          { symbol: this.tokenAInfo.dsymbol },
        );
      }
      return `${this.$t(`swap.${this.workMode}`).toUpperCase()} ${this.tokenAInfo.dsymbol}`;
    },
    isPairExist() {
      if (!this.tokenAInfo) {
        return true;
      }
      if (this.tokenAInfo && !this.tokenBInfo) {
        return false;
      }
      // eslint-disable-next-line no-nested-ternary
      const uT = this.tokenAInfo.tag === 'uToken'
        ? this.tokenAInfo
        : this.tokenBInfo.tag === 'uToken'
          ? this.tokenBInfo
          : null;
      // eslint-disable-next-line no-nested-ternary
      const yT = this.tokenAInfo.tag === 'y3dToken'
        ? this.tokenAInfo
        : this.tokenBInfo.tag === 'y3dToken'
          ? this.tokenBInfo
          : null;
      if (uT && yT) {
        let r = false;
        this.pairList.forEach((e) => {
          if (
            e.uToken === uT.dsymbol
            && e.y3dToken === yT.dsymbol && e.yaddress === yT.address && e.uaddress === uT.address
          ) {
            r = true;
          }
        });
        return r;
      }
      return false;
    },
    isBtnDisabled() {
      return !(
        parseFloat(this.tokenAAmount) > 0
        && this.tokenAAmount
        && this.tokenBAmount
        && !this.tokenAIsBadInput
        && this.isPairExist
      );
    },
    workMode() {
      if (this.tokenAInfo.tag === 'uToken') {
        return 'stake';
      }
      return 'unstake';
    },
  },
  watch: {
    logo: {
      handler() {
        this.tokenIcon = this.logo;
      },
      immediate: true,
    },
    uTokenList() {
      this.initializationBaseTokenInfo();
    },
    network() {
      this.initializationBaseTokenInfo();
    },
    address() {
      this.updateTokenInfo();
    },
    tokenA(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateTokenInfo();
      }
    },
    tokenB(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateTokenInfo();
      }
    },
  },
  methods: {
    initializationBaseTokenInfo() {
      if (this.uTokenList && this.uTokenList.length > 0) {
        this.tokenAInfo = JSON.parse(JSON.stringify(this.uTokenList[0]));
        this.payloadTokenA = this.tokenAInfo;
        this.tokenA = this.uTokenList[0].address;
      }
    },
    clickOnSwitch() {
      this.uTokenIndexTag = this.uTokenIndexTag === 'A' ? 'B' : 'A';
      [this.payloadTokenA, this.payloadTokenB] = [this.payloadTokenB, this.payloadTokenA];
      [this.tokenA, this.tokenB] = [this.tokenB, this.tokenA];
      [this.tokenAAmount, this.tokenBAmount] = [this.tokenBAmount, this.tokenAAmount];
      [this.tokenBInfo, this.tokenAInfo] = [this.tokenAInfo, this.tokenBInfo];
    },
    updateTokenInfo() {
      this.handleFetchERC20Detail('A');
      this.handleFetchERC20Detail('B');
    },
    getERC20(_address) {
      return CommonERC20.attach(_address).connect(getProvider().getSigner());
    },
    async handleFetchERC20Detail(whichToken) {
      if (!this.address) {
        return;
      }
      if (whichToken === 'A' && (!this.tokenA || this.tokenA === '')) {
        return;
      }
      if (whichToken === 'B' && (!this.tokenB || this.tokenB === '')) {
        return;
      }
      const {
        address, name, symbol, totalSupply, decimals, balance, pool, fee,
      } = await fetchERC20Detail(whichToken === 'A' ? this.tokenA : this.tokenB, this.address);

      // balance that for display
      const dBalance = utils.formatUnits(balance, decimals);
      const r = {
        // eslint-disable-next-line no-nested-ternary
        ...(whichToken === 'A'
          ? this.payloadTokenA
            ? this.payloadTokenA
            : this.tokenAInfo
          : this.payloadTokenB),
        fee,
        pool,
        address,
        name,
        symbol,
        totalSupply,
        decimals,
        balance,
        dBalance,
      };
      if (whichToken === 'A') {
        if (r.address !== this.tokenA) {
          return;
        }
        this.tokenAInfo = r;
        if (this.tokenAAmount) {
          this.updateBAmount();
        } else {
          this.updateAAmount();
        }
      } else {
        if (r.address !== this.tokenB) {
          return;
        }
        this.tokenBInfo = r;
        this.updateBAmount();
      }
    },
    fillMax(field, value) {
      this[field] = value;
    },
    selectTokenA(payload) {
      if (!payload || !payload.address) {
        return;
      }
      this.payloadTokenA = payload;
      this.tokenAInfo = payload;
      this.tokenA = payload.address;
      if (this.tokenB && this.tokenB === this.tokenA) {
        this.tokenB = '';
        this.payloadTokenB = null;
        this.tokenBInfo = null;
      }
    },
    selectTokenB(payload) {
      if (!payload || !payload.address) {
        return;
      }
      this.payloadTokenB = payload;
      this.tokenBInfo = payload;
      this.tokenB = payload.address;
      if (this.tokenA && this.tokenB === this.tokenA) {
        this.tokenA = '';
        this.payloadTokenA = null;
        this.tokenAInfo = null;
      }
    },
    tokenAAmountChanged(val, rawAmount) {
      console.log(rawAmount);
      if (!val) {
        this.tokenAAmount = '';
        return;
      }
      this.tokenAAmount = val;
      this.updateBAmount();
      if (parseFloat(val) === 0) return;
      this.exactIn = 'A';
    },
    updateBAmount() {
      if (!this.tokenAAmount || !this.tokenAInfo || !this.tokenBInfo) {
        return;
      }
      const y3dTokenInfo = this.uTokenIndexTag === 'A' ? this.tokenBInfo : this.tokenAInfo;
      const { totalSupply, pool } = y3dTokenInfo;
      if (totalSupply && pool) {
        if (this.uTokenIndexTag === 'A') {
          // stake
          const result = swaputil.dealstakey3d(totalSupply, pool, this.tokenAAmount);
          if (result) {
            this.tokenBAmount = result;
            return;
          }
        } else {
          // unstake
          const { fee } = y3dTokenInfo;
          const result = swaputil.dealunstakey3d(totalSupply, pool, this.tokenAAmount, fee);
          if (result) {
            this.tokenBAmount = result;
            return;
          }
        }
      }
      this.tokenBAmount = '';
    },
    tokenBAmountChanged(val, rawAmount) {
      console.log(rawAmount);
      if (!val) {
        this.tokenBAmount = '';
        return;
      }
      this.tokenBAmount = val;
      this.updateAAmount();
      if (parseFloat(val) === 0) return;
      this.exactIn = 'B';
    },
    updateAAmount() {
      if (!this.tokenBAmount || !this.tokenAInfo || !this.tokenBInfo) {
        return;
      }
      const y3dTokenInfo = this.uTokenIndexTag === 'A' ? this.tokenBInfo : this.tokenAInfo;
      const { totalSupply, pool } = y3dTokenInfo;
      if (totalSupply && pool) {
        if (this.uTokenIndexTag === 'A') {
          // stake
          const result = swaputil.dealstakeu(totalSupply, pool, this.tokenBAmount);
          if (result) {
            this.tokenAAmount = result;
            return;
          }
        } else {
          // unstake
          const { fee } = y3dTokenInfo;
          const result = swaputil.dealunstakeu(totalSupply, pool, this.tokenBAmount, fee);
          if (result) {
            this.tokenAAmount = result;
            return;
          }
        }
      }
      this.tokenAAmount = '';
    },
    tokenAIsBadInputChange(isBadInput) {
      this.tokenAIsBadInput = isBadInput;
    },
    async stake() {
      try {
        this.isSendingTx = true;
        const uTContract = this.getERC20(this.tokenAInfo.address);
        const user = this.address;
        const approvedAmount = await uTContract.allowance(user, this.tokenBInfo.address);
        const uTokenUnit = this.tokenAInfo.decimals;
        const parsedInput = utils.parseUnits(this.tokenAAmount, uTokenUnit);
        if (parsedInput.gt(this.tokenAInfo.balance)) {
          // eslint-disable-next-line no-alert
          alert(this.$t('app.tipNoMuchToken'));
          this.isSendingTx = false;
          return;
        }
        if (parsedInput.gt(approvedAmount)) {
          const txRes = await uTContract.approve(this.tokenBInfo.address, parsedInput);
          await txRes.wait(1);
        }
        const y3dT = y3DToken.attach(this.tokenBInfo.address).connect(getProvider().getSigner());
        const stakeRes = await y3dT.stake(parsedInput);
        const stakeReceipt = await stakeRes.wait(1);
        console.info('stake::receipt', stakeReceipt);
        // eslint-disable-next-line no-alert
        alert(this.$t('swap.stakeSucc'));
        this.lastTxHash = stakeReceipt.transactionHash;
        this.isSendingTx = false;
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(err.message);
        this.isSendingTx = false;
      }
      this.updateTokenInfo();
    },
    async unstake() {
      try {
        this.isSendingTx = true;
        const yTokenUnit = this.tokenAInfo.decimals;
        const parsedInput = utils.parseUnits(this.tokenAAmount, yTokenUnit);
        if (parsedInput.gt(this.tokenAInfo.balance)) {
          // eslint-disable-next-line no-alert
          alert(this.$t('app.tipNoMuchy3dToken'));
          this.isSendingTx = false;
          return;
        }
        const y3dT = y3DToken.attach(this.tokenAInfo.address).connect(getProvider().getSigner());
        const stakeRes = await y3dT.unstake(parsedInput);
        console.info('unstake::stakeRes', stakeRes);
        const unstakeReceipt = await stakeRes.wait(1);
        console.info('unstake::receipt', unstakeReceipt);
        // eslint-disable-next-line no-alert
        alert(this.$t('swap.unstakeSucc'));
        this.lastTxHash = unstakeReceipt.transactionHash;
        this.isSendingTx = false;
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(err.message);
        this.isSendingTx = false;
      }
      this.updateTokenInfo();
    },
    clickActionButton() {
      if (this.workMode === 'stake') {
        this.stake();
      } else {
        this.unstake();
      }
    },
    clearSelectTokenB() {
      this.payloadTokenB = null;
      this.tokenBInfo = null;
      this.tokenB = '';
    },
    clearSelectTokenA() {
      this.payloadTokenA = null;
      this.tokenAInfo = null;
      this.tokenA = '';
    },
    goToCreateY3dToken() {
      this.$router.push(this.createUrl);
    },
  },
  mounted() {
    this.handleFetchERC20Detail('A');
    this.initializationBaseTokenInfo();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color';

.swap-page {
  position: relative;
  margin-top: 30px;
  .split-line {
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    p {
      margin-left: 6px;
      background-color: rgba($color: white, $alpha: 0.5);
      border-radius: 6px;
      font-size: 12px;
      padding: 0 8px;
      color: $um-text;
    }
  }
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
  p {
    width: 100%;
    margin-top: 10px;
    text-align: right;
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
.go-to-create {
  color: $y3d-blue;
  font-weight: bold;
}
</style>
