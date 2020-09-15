<template>
  <div class="easy-item-content">
    <div class="easy-item" v-for="(data, index) of itemData" :key="index">
      <div class="easy-item-left">
        <p>
          Deposit <span>{{ data.deposit }}</span>
        </p>
        <div class="easy-item-left-mint">
          <img src="@/assets/united-mint/more.png" />
          <p>
            Mint <span>{{ data.mint }}</span>
          </p>
        </div>
      </div>
      <div class="easy-item-center">
        <div class="easy-item-center-input">
          <input type="text" placeholder="0.0" v-model="data.usdtInput" />
          <button class="max-button basic button" @click="clickOnMaxUSDT">
            MAX
          </button>
        </div>
        <button
          class="operating-button ui icon button ml8"
          @click="deposit"
          :disabled="loadingDeposit"
          :class="loadingDeposit && 'loading'"
        >
          <p>DEPOSIT</p>
        </button>
      </div>
      <div class="easy-item-right">
        <p>
          apy <span>{{ data.apy }}</span>
        </p>
        <p>
          Balance <span>{{ data.balance }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MintHelper from '@/contract/mint-helper';

export default {
  name: 'easyItem',
  data() {
    return {
      usdtInput: '',
      tokenInput: '',
      loadingDeposit: false,
      loadingMint: false,
      loadingClaim: false,
      loadingDepositMClaim: false,
      loadingRestore: false,
      itemData: [
        {
          deposit: 'USDT',
          mint: 'yYCrv',
          usdtInput: '',
          apy: '546.36%',
          balance: '100',
        },
        {
          deposit: 'USDT',
          mint: 'yswUSD',
          usdtInput: '',
          apy: '546.36%',
          balance: '100',
        },
        {
          deposit: 'USDT',
          mint: 'yDAI3D',
          usdtInput: '',
          apy: '546.36%',
          balance: '100',
        },
      ],
    };
  },
  methods: {
    clickOnMaxUSDT() {
      this.usdtInput = parseFloat(this.yourData.unmintedUSDT);
    },
    async deposit() {
      this.loadingDeposit = true;
      try {
        await MintHelper.uniDepositContract_deposit_amount(`${this.usdtInput}`);
      } catch (err) {
        console.log(err);
      }
      this.loadingDeposit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
.easy-item-content {
  max-width: 880px;
  width: 100%;
}
.easy-item {
  width: 100%;
  background-color: $um-orange-bg;
  padding: 16px 22px;
  border-radius: 16px;
  border: 4px solid $um-orange;
  min-height: 52px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  &-left {
    flex: 1;
    p {
      font-size: 14px;
      margin: 0;
      span {
        font-weight: bold;
      }
    }
    &-mint {
      display: flex;
      align-items: center;
      margin-right: 32px;
      img {
        height: 10px;
        margin: 0 5px 0 8px;
      }
    }
  }
  &-center {
    flex: 3;
    display: flex;
    align-items: center;
    &-input {
      flex-grow: 3;
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 8px 0 16px;
      border: 1px solid $um-text;
      border-radius: 4px;
      background-color: white;
      input {
        width: 80%;
        background-color: transparent;
        border: 0px;
        outline: none;
        font-size: 16px;
        color: $um-text;
      }
      .max-button {
        margin-left: 8px !important;
        padding: 0 8px;
        height: 24px;
        background-color: $um-orange-bg;
        font-size: 14px;
        border: 1px solid $um-text;
        border-radius: 2px;
        word-break: normal;
      }
    }
    .operating-button:hover {
      background-color: rgba($color: $um-orange, $alpha: 0.8);
    }
    .operating-button {
      margin-left: 0.5rem;
      flex-shrink: 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      background-color: $um-orange;
      width: 120px;
      box-shadow: 2px 2px 0px 0px $um-text;
      img {
        height: 16px;
        margin-right: 4px;
      }
      p {
        word-break: normal;
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        display: inline-flex;
        align-items: center;
        color: $um-text;
      }
    }
  }
  &-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    p {
      font-size: 14px;
      margin: 0;
      span {
        font-weight: bold;
      }
    }
  }
}
</style>
