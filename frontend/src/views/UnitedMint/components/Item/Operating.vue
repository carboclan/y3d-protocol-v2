<template>
  <div class="united-mint-operating" v-if="mode === 'difficult'">
    <div class="united-mint-operating-top">
      <div class="united-mint-operating-top-deposit">
        <p>
          {{ $t('swap.Balance') }}:
          <span>{{ displayBalance(userBalances.usdt, userBalances.usdtDecimals) }} USDT</span>
        </p>
        <div class="united-mint-operating-top-deposit-wrap">
          <div
            class="united-mint-operating-wrap-input"
            :class="usdtInputError ? 'input-error' : ''"
          >
            <input type="text" placeholder="0.0" v-model="usdtInput" />
            <button class="max-button basic button" @click="clickOnMaxUSDT">
              {{ $t('swap.max') }}
            </button>
          </div>
          <button
            class="operating-button ui icon button ml8"
            @click="deposit"
            :disabled="loadingDeposit"
            :class="loadingDeposit && 'loading'"
          >
            <img src="@/assets/united-mint/deposit.png" />
            <p>{{ $t('um.Deposit').toUpperCase() }}</p>
          </button>
        </div>
      </div>
      <div class="united-mint-operating-center">
        <p></p>
        <div class="united-mint-operating-center-p">{{ $t('um.or') }}</div>
      </div>
      <div class="united-mint-operating-top-panel">
        <p>{{ $t('um.highLevelPanel') }}</p>
        <div class="united-mint-operating-top-deposit-wrap">
          <button
            class="operating-button ui icon button"
            @click="depositMClaim"
            :disabled="loadingDepositMClaim"
            :class="loadingDepositMClaim && 'loading'"
          >
            <img src="@/assets/united-mint/lighting.png" />
            <p>
              {{ $t('um.Deposit').toUpperCase() }} + {{ $t('um.Mint').toUpperCase() }}
               + {{ $t('um.Claim').toUpperCase() }}</p>
          </button>
        </div>
      </div>
    </div>
    <div class="united-mint-operating-bottom">
      <div class="united-mint-operating-bottom-restore">
        <p>
          {{ $t('swap.Balance') }}:
          <span
            >{{ displayBalance(userBalances.tokenBalance, userBalances.tokenDecimals) }}
            {{ data.key }}</span
          >
        </p>
        <div class="united-mint-operating-bottom-restore-wrap">
          <div
            class="united-mint-operating-wrap-input"
            :class="tokenInputError ? 'input-error' : ''"
          >
            <input type="text" placeholder="0.0" v-model="tokenInput" />
            <button class="max-button basic button" @click="clickOnMaxToken">
              {{ $t('swap.max') }}
            </button>
          </div>
          <button
            class="operating-button ui icon button ml8"
            @click="restore"
            :disabled="loadingRestore"
            :class="loadingRestore && 'loading'"
          >
            <img src="@/assets/united-mint/restore.png" />
            <p>{{ $t('um.Restore').toUpperCase() }}</p>
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
            <p>{{ $t('um.Mint').toUpperCase() }}</p>
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
            <p>{{ $t('um.Claim').toUpperCase() }}</p>
          </button>
        </div>
      </div>
    </div>
    <div class="united-mint-operating-bottom-line" />
  </div>
  <!-- easy mode -->
  <div class="united-mint-operating united-mint-operating-easy" v-else>
    <div class="united-mint-operating-deposit">
      <p>{{ $t('um.Deposit') }} <span>USDT</span></p>
      <div>
        <img src="@/assets/united-mint/more.png" />
        <p>
          {{ $t('um.Mint') }} <span>{{ data.key }}</span>
        </p>
      </div>
    </div>
    <!-- deposit in pc mode -->
    <div
      class="united-mint-operating-top-deposit-wrap united-mint-operating-top-deposit-wrap-center"
    >
      <div class="united-mint-operating-wrap-input" :class="usdtInputError ? 'input-error' : ''">
        <input type="text" placeholder="0.0" v-model="usdtInput" />
        <button class="max-button basic button" @click="clickOnMaxUSDT">
          {{ $t('swap.max') }}
        </button>
      </div>
      <button
        class="operating-button ui icon button ml8"
        @click="deposit"
        :disabled="loadingDeposit"
        :class="loadingDeposit && 'loading'"
      >
        <img src="@/assets/united-mint/deposit.png" />
        <p>{{ $t('um.Deposit').toUpperCase() }}</p>
      </button>
    </div>
    <div class="united-mint-operating-info">
      <p>{{ $t('um.APY') }}: <span>{{ data.apy }}%</span></p>
      <p>
        {{ $t('swap.Balance') }}:
        <span>{{ displayBalance(userBalances.usdt, userBalances.usdtDecimals) }} USDT</span>
      </p>
    </div>
    <!-- deposit in phone mode -->
    <div
      class="united-mint-operating-top-deposit-wrap united-mint-operating-top-deposit-wrap-phone"
    >
      <div class="united-mint-operating-wrap-input" :class="usdtInputError ? 'input-error' : ''">
        <input type="text" placeholder="0.0" v-model="usdtInput" />
        <button class="max-button basic button" @click="clickOnMaxUSDT">
          {{ $t('swap.max') }}
        </button>
      </div>
      <button
        class="operating-button ui icon button ml8"
        @click="deposit"
        :disabled="loadingDeposit"
        :class="loadingDeposit && 'loading'"
      >
        <img src="@/assets/united-mint/deposit.png" />
        <p>{{ $t('um.Deposit').toUpperCase() }}</p>
      </button>
    </div>
  </div>
</template>

<script>
import MintHelper from '@/contract/mint-helper';
import { utils } from '../../../../store/ethers/ethersConnect';

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
      usdtInputError: false,
      tokenInputError: false,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => null,
    },
    mode: {
      type: String,
      // difficult
      default: 'easy',
    },
    userBalances: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  computed: {},
  methods: {
    displayBalance(price, decimals) {
      if (!price) return '...';
      const p = this.formatPrice(price, decimals);
      const pointIndex = p.indexOf('.');
      if (p !== -1) {
        return p.substring(0, pointIndex + 5);
      }
      return p;
    },
    formatPrice(price, decimals) {
      if (!price) return '...';
      return utils.formatUnits(price, decimals);
    },
    clickOnMaxUSDT() {
      this.usdtInput = this.formatPrice(this.userBalances.usdt, this.userBalances.usdtDecimals);
    },
    clickOnMaxToken() {
      this.tokenInput = this.formatPrice(
        this.userBalances.tokenBalance,
        this.userBalances.tokenDecimals,
      );
    },
    async deposit() {
      this.loadingDeposit = true;
      try {
        await MintHelper.uniDepositContract_deposit_amount(this.$i18n, `${this.usdtInput}`, this.data);
      } catch (err) {
        console.log(err);
      }
      this.loadingDeposit = false;
    },
    async mint() {
      this.loadingMint = true;
      try {
        await MintHelper.uniDepositContract_mint(this.$i18n, this.data);
      } catch (err) {
        console.log(err);
      }
      this.loadingMint = false;
    },
    async claim() {
      this.loadingClaim = true;
      try {
        await MintHelper.uniDepositContract_claim(this.$i18n, this.data);
      } catch (err) {
        console.log(err);
      }
      this.loadingClaim = false;
    },
    async depositMClaim() {
      this.loadingDepositMClaim = true;
      try {
        await MintHelper.uniDepositContract_deposit_n_claim(this.$i18n, `${this.usdtInput}`, this.data);
      } catch (err) {
        console.log(err);
      }
      this.loadingDepositMClaim = false;
    },
    async restore() {
      this.loadingRestore = true;
      try {
        await MintHelper.uniDepositContract_restore_amount(this.$i18n, `${this.tokenInput}`, this.data);
      } catch (err) {
        console.log(err);
      }
      this.loadingRestore = false;
    },
  },
  watch: {
    usdtInput() {
      if (this.usdtInput === '') {
        this.usdtInputError = false;
        return;
      }
      if (
        utils
          .parseUnits(this.usdtInput, this.userBalances.usdtDecimals)
          .gt(this.userBalances.usdt.toString())
      ) {
        this.usdtInputError = true;
      } else {
        this.usdtInputError = false;
      }
    },
    tokenInput() {
      if (this.tokenInput === '') {
        this.tokenInputError = false;
        return;
      }
      if (
        utils
          .parseUnits(this.tokenInput, this.userBalances.tokenDecimals)
          .gt(this.userBalances.tokenBalance.toString())
      ) {
        this.tokenInputError = true;
      } else {
        this.tokenInputError = false;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color.scss';
@media (max-width: 600px) {
  .united-mint-operating-easy {
    flex-wrap: wrap;
    .united-mint-operating-top-deposit-wrap-phone {
      display: flex !important;
      width: 100%;
      flex-shrink: 0;
      margin-top: 8px;
    }
    .united-mint-operating-top-deposit-wrap-center {
      display: none !important;
    }
    .united-mint-operating-deposit,
    .united-mint-operating-info {
      width: 50%;
    }
    .united-mint-operating-deposit {
      flex-shrink: 0;
      flex-direction: column;
      align-items: flex-start !important;
      div {
        display: flex;
        align-items: center;
      }
      img {
        margin-left: 0 !important;
      }
    }
    .united-mint-operating-info {
      flex-shrink: 0;
      flex-direction: column;
      align-items: flex-end !important;
      p {
        text-align: right;
      }
      p:first-of-type {
        margin-right: 0 !important;
      }
      span {
        font-weight: bold;
      }
    }
  }
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

.united-mint-operating-easy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0 !important;
  padding: 0 !important;
  .united-mint-operating-top-deposit-wrap-phone {
    display: none;
  }
  .united-mint-operating-deposit,
  .united-mint-operating-info {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    p {
      font-size: 14px;
      margin: 0;
      span {
        font-weight: bold;
      }
    }
    img {
      height: 10px;
      margin: 0 5px 0 8px;
    }
  }
  .united-mint-operating-deposit {
    flex-shrink: 0;
    div {
      display: flex;
      align-items: center;
    }
  }
  .united-mint-operating-info {
    p:first-of-type {
      margin-right: 16px;
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
        span {
          font-weight: bold;
        }
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
        .input-error {
          border: 1px solid red !important;
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
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
