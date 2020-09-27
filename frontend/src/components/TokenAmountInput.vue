<template>
  <div>
    <div class="tai-container">
      <div class="tai-inner-container" :class="{ 'tai-bad-input': !isToToken && isBadInput }">
        <div class="tai-info">
          <div class="tai-content">
            <div class="tai-title"><slot name="title"></slot></div>
            <div class="tai-balance">Balance: {{ tokenInfo && formattedBalance }}</div>
          </div>
        </div>
        <div class="tai-input-container">
          <input
            class="tai-input"
            inputmode="decimal"
            title="Token Amount"
            autocomplete="off"
            autocorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            minlength="1"
            :value="amount"
            @input="onAmountChange"
            maxlength="79"
            spellcheck="false"
          />
          <FillMaxButton @click="fillMax" />
          <SelectdTokenButton
            :isTokenSelected="isTokenSelected"
            :tokenLogo="tokenInfo && tokenInfo.logo ? tokenInfo.logo : tokenLogo"
            @click="showTokenMenu"
            >{{ tokenInfo && tokenInfo.dsymbol }}</SelectdTokenButton
          >
        </div>
      </div>
    </div>
    <SelectTokenModal
      :isUToken="isUToken"
      v-model="isModalShowing"
      @select-token="selectToken"
      :pairList="pairList"
      :otherTokenInfo="otherTokenInfo"
      :tokenInfo="tokenInfo"
    ></SelectTokenModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { BigNumber } from 'ethers';
import { formatUnits } from '@ethersproject/units';
import { utils } from '@/store/ethers/ethersConnect';
import FillMaxButton from '@/components/FillMaxButton.vue';
import SelectdTokenButton from '@/components/SelectedTokenButton.vue';
import SelectTokenModal from '@/components/SelectTokenModal.vue';

export default Vue.extend({
  name: 'TokenAmountInput',
  components: {
    FillMaxButton,
    SelectdTokenButton,
    SelectTokenModal,
  },
  props: {
    otherTokenInfo: {
      type: Object,
      default: null,
    },
    pairList: {
      type: Array,
      default: () => [],
    },
    tokenInfo: {
      type: Object,
      default: null,
    },
    tokenLogo: {
      type: String,
      default: '',
    },
    isTokenSelected: {
      type: Boolean,
      default: false,
    },
    tokenAmount: {
      type: String,
      default: '',
    },
    isBadInputChange: {
      type: Function,
      default: () => {},
    },
    isToToken: {
      type: Boolean,
      default: false,
    },
    isUToken: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    amount: '',
    isModalShowing: false,
    isBadInput: false,
  }),
  computed: {
    formattedBalance(): string {
      if (!this.tokenInfo.balance) {
        return '0.0';
      }
      return formatUnits(this.tokenInfo.balance, this.tokenInfo.decimals);
    },
  },
  watch: {
    tokenAmount(val) {
      this.amount = val;
      const parsedAmount = utils.parseUnits(val, this.tokenInfo.decimals);
      const balance = BigNumber.from(this.tokenInfo.balance);
      this.isBadInput = parsedAmount.gt(balance);
    },
    isBadInput() {
      this.$emit('isBadInputChange', this.isBadInput);
    },
  },
  methods: {
    onAmountChange(ev: any) {
      const userInput = ev.target.value;
      this.setAmount(userInput);
    },
    setAmount(userInput: string) {
      try {
        const parsedAmount = utils.parseUnits(userInput || '0', this.tokenInfo.decimals);
        const balance = BigNumber.from(this.tokenInfo.balance);
        this.isBadInput = parsedAmount.gt(balance);
        this.$emit('amount-changed', userInput, parsedAmount);
      } catch (e) {
        console.warn(e);
        this.isBadInput = true;
      }
    },
    showTokenMenu() {
      this.isModalShowing = true;
    },
    fillMax() {
      this.setAmount(utils.formatUnits(this.tokenInfo.balance, this.tokenInfo.decimals).toString());
    },
    selectToken(payload: any) {
      this.$emit('select-token', payload.data);
    },
  },
});
</script>

<style lang="scss" scoped>
.tai-container {
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 20px;
  background-color: rgb(44, 47, 54);
  z-index: 1;
  box-sizing: border-box;
}
.tai-inner-container {
  border-radius: 20px;
  border: 1px solid rgb(44, 47, 54);
  background-color: rgb(33, 36, 41);
}
.tai-info {
  display: flex;
  flex-flow: row nowrap;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(255, 255, 255);
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0px;
}
.tai-content {
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
.tai-title {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
  font-size: 14px;
  color: rgb(195, 197, 203);
}
.tai-balance {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
  font-size: 14px;
  color: rgb(195, 197, 203);
  display: inline;
  cursor: pointer;
}
.tai-input-container {
  display: flex;
  flex-flow: row nowrap;
  -webkit-box-align: center;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  box-sizing: border-box;
}
.tai-input {
  color: rgb(255, 255, 255);
  width: 0px;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: rgb(33, 36, 41);
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  appearance: textfield;
  letter-spacing: -0.018em;
}
.tai-bad-input {
  border: red solid 1px;
}
</style>
