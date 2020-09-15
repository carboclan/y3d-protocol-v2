<template>
  <div class="united-mint-header">
    <div class="united-mint-header-wrap">
      <div class="united-mint-header-deposit">
        <p>Deposit <span>USDT</span></p>
        <img src="@/assets/united-mint/more.png" />

        <p>Mint <span>yYCrv</span></p>
      </div>
      <div class="united-mint-header-contract">
        <p>Contract</p>
        <img src="@/assets/united-mint/copy.png"
          :class="'copy-button_' + yyCrvAddr"
          :data-clipboard-text="yyCrvAddr" />
        <img src="@/assets/united-mint/click.png" @click="clickOnLink" />
      </div>
      <div class="united-mint-header-apy">
        <p>apy: ...</p>
      </div>
    </div>
    <div class="united-mint-header-toggle" @click="clickOnToggle">
      <img :class="opened ? '' : 'toggle-img-close'" src="@/assets/united-mint/unfold.png" />
    </div>
  </div>
</template>

<script>
import { yyCrvAddr } from '@/contract/index';
import ClipboardJS from 'clipboard';

export default {
  name: 'UnitedMintItemHeader',
  data() {
    return {};
  },
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => null,
    },
    headerClickOnToggle: {
      type: Function,
      default: () => {},
    },
  },
  components: {},
  computed: {
    yyCrvAddr() {
      return yyCrvAddr;
    },
  },
  methods: {
    clickOnToggle() {
      this.$emit('headerClickOnToggle', this.data);
    },
    clickOnLink() {
      window.location.href = `https://etherscan.io/address/${this.yyCrvAddr}`;
    },
  },
  watch: {},
  mounted() {
    const clipboard = new ClipboardJS(`.copy-button_${this.yyCrvAddr}`);
    clipboard.on('success', (e) => {
      // eslint-disable-next-line no-alert
      alert('Copy succeeded');
      e.clearSelection();
    });
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 500px) {
  .united-mint-header {
    &-wrap {
      flex-direction: column;
      align-items: flex-start !important;
    }
    &-deposit,
    &-contract {
      margin-bottom: 8px;
    }
  }
}

.united-mint-header {
  display: flex;
  align-items: center;
  p {
    font-size: 14px;
    margin: 0;
    span {
      font-weight: bold;
    }
  }
  &-wrap {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  &-deposit,
  &-contract,
  &-apy,
  &-toggle {
    display: flex;
    align-items: center;
  }
  &-deposit {
    margin-right: 32px;
    img {
      height: 10px;
      margin: 0 5px 0 8px;
    }
  }
  &-contract {
    flex-grow: 1;
    img {
      margin-left: 8px;
      height: 16px;
    }
  }
  &-apy {
    margin-right: 32px;
  }
  &-toggle {
    img {
      width: 16px;
    }
    .toggle-img-close {
      transform: rotate(180deg);
    }
  }
}
</style>
