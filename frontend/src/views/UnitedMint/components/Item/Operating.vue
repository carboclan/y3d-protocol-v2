<template>
  <div class="united-mint-operating">
    <div class="united-mint-operating-top">
      <div class="united-mint-operating-top-deposit">
        <p>Blance: {{ yourData.unmintedUSDT }} USDT</p>
        <div class="united-mint-operating-top-deposit-wrap">
          <div class="united-mint-operating-wrap-input">
            <input type="text" placeholder="0.0" v-model="usdtInput" />
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
            <img src="@/assets/united-mint/deposit.png" />
            <p>DEPOSIT</p>
          </button>
        </div>
      </div>
      <div class="united-mint-operating-center">
        <p></p>
        <div class="united-mint-operating-center-p">or</div>
      </div>
      <div class="united-mint-operating-top-panel">
        <p>High Level Panel</p>
        <div class="united-mint-operating-top-deposit-wrap">
          <button
            class="operating-button ui icon button"
            @click="depositMClaim"
            :disabled="loadingDepositMClaim"
            :class="loadingDepositMClaim && 'loading'"
          >
            <img src="@/assets/united-mint/lighting.png" />
            <p>DEPOSIT + MINT + CLAIM</p>
          </button>
        </div>
      </div>
    </div>
    <div class="united-mint-operating-bottom">
      <div class="united-mint-operating-bottom-restore">
        <p>Blance: {{ yourData.unclaimedToken }} yYCrv (... USDT)</p>
        <div class="united-mint-operating-bottom-restore-wrap">
          <div class="united-mint-operating-wrap-input">
            <input type="text" placeholder="0.0" v-model="tokenInput" />
            <button class="max-button basic button" @click="clickOnMaxToken">
              MAX
            </button>
          </div>
          <button
            class="operating-button ui icon button ml8"
            @click="restore"
            :disabled="loadingRestore"
            :class="loadingRestore && 'loading'"
          >
            <img src="@/assets/united-mint/restore.png" />
            <p>RESTORE</p>
          </button>
        </div>
      </div>
      <div class="united-mint-operating-center united-mint-operating-center-line-wrap">
        <p></p>
        <div class="united-mint-operating-center-line"></div>
      </div>
      <div class="united-mint-operating-bottom-other">
        <p></p>
        <div class="united-mint-operating-bottom-other-wrap">
          <button
            class="operating-button ui icon button"
            @click="mint"
            :disabled="loadingMint"
            :class="loadingMint && 'loading'"
          >
            <img src="@/assets/united-mint/mint.png" />
            <p>MINT</p>
          </button>
          <img
            class="united-mint-operating-bottom-other-wrap-arrow"
            src="@/assets/united-mint/more.png"
          />
          <button
            class="operating-button ui icon button"
            @click="claim"
            :disabled="loadingClaim"
            :class="loadingClaim && 'loading'"
          >
            <img src="@/assets/united-mint/claim.png" />
            <p>CLAIM</p>
          </button>
        </div>
      </div>
    </div>
    <div class="united-mint-operating-bottom-line" />
  </div>
</template>

<script>
import MintHelper from '@/contract/mint-helper';

export default {
  name: 'UnitedMintItemOperating',
  data() {
    return {
      usdtInput: '',
      tokenInput: '',
      loadingDeposit: false,
      loadingMint: false,
      loadingClaim: false,
      loadingDepositMClaim: false,
      loadingRestore: false,
    };
  },
  props: {
    yourData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  computed: {},
  methods: {
    clickOnMaxUSDT() {
      this.usdtInput = parseFloat(this.yourData.unmintedUSDT);
    },
    clickOnMaxToken() {
      this.tokenInput = parseFloat(this.yourData.unclaimedToken);
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
    async mint() {
      this.loadingMint = true;
      try {
        await MintHelper.uniDepositContract_mint();
      } catch (err) {
        console.log(err);
      }
      this.loadingMint = false;
    },
    async claim() {
      this.loadingClaim = true;
      try {
        await MintHelper.uniDepositContract_claim();
      } catch (err) {
        console.log(err);
      }
      this.loadingClaim = false;
    },
    async depositMClaim() {
      this.loadingDepositMClaim = true;
      try {
        await MintHelper.uniDepositContract_deposit_n_claim(`${this.usdtInput}`);
      } catch (err) {
        console.log(err);
      }
      this.loadingDepositMClaim = false;
    },
    async restore() {
      this.loadingRestore = true;
      try {
        await MintHelper.uniDepositContract_restore_amount(`${this.tokenInput}`);
      } catch (err) {
        console.log(err);
      }
      this.loadingRestore = false;
    },
  },
  watch: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@media (max-width: 600px) {
  .united-mint-operating-center-line-wrap {
    display: none;
  }
  .united-mint-operating-center {
    p {
      display: none;
    }
    .united-mint-operating-center-p {
      height: 20px !important;
    }
  }
  .united-mint-operating {
    padding: 0 0px !important;
    margin-top: 20px !important;
    &-top,
    &-bottom {
      flex-direction: column;
      &-deposit,
      &-panel,
      &-restore,
      &-other {
        margin-top: 20px;
        width: 100% !important;
      }
    }
  }
}
.united-mint-operating {
  margin-top: 48px;
  padding: 0 26px;
  &-bottom-line {
    height: 1px;
    width: 100%;
    background-color: $um-line;
    margin-top: 24px;
  }
  .united-mint-operating-center {
    &-p {
      font-size: 14px;
      flex-shrink: 0;
      height: 40px;
      line-height: 40px;
    }
    &-line {
      margin-top: 28px;
      background-color: $um-line;
      width: 1px;
      height: 24px;
    }
  }
  &-bottom {
    margin-top: 16px;
  }
  &-top,
  &-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-deposit,
    &-panel,
    &-restore,
    &-other {
      width: 47%;
      p {
        font-size: 16px;
        margin: 0 0 8px 0;
        height: 20px;
      }
      &-wrap {
        display: flex;
        align-items: center;
        &-arrow {
          height: 10px;
          margin: 0 10px;
        }
        .ml8 {
          margin-left: 8px;
        }
        .operating-button:hover {
          background-color: rgba($color: $um-orange, $alpha: 0.8);
        }
        .operating-button {
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
        .united-mint-operating-wrap-input {
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
      }
    }
  }
}
</style>
