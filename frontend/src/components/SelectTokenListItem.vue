<template>
  <div
    @click="$emit('on-click')"
    :title="name"
    :class="{
      'c-select-token-item': true,
      'c-select-token-item--disabled': disabled
    }"
  >
    <div class="c-select-token-icon">
      <div class="c-select-token-icon" v-if="isYToken">
        <img src="@/assets/base/y3d.png" class="c-select-token-icon-image" alt="Token logo" />
      </div>
      <div class="c-select-token-icon" v-else-if="logo || isHardCodeToken">
        <img :src="logo" class="c-select-token-icon-image" alt="Token logo" :onerror="errImg" />
      </div>
      <div class="c-select-token-icon" v-else>
        <HelpCircleIcon class="c-select-token-icon" />
      </div>
    </div>
    <div class="c-select-token-name">
      <div class="c-select-token-name-text">{{ symbol }}</div>
      <a
        v-if="tokenAddressInfo"
        :href="tokenAddressInfo.addressLink"
        class="c-select-token-name-link"
        target="_blank"
        rel="noopener noreferrer"
        @click.stop="() => {}"
      >{{ tokenAddressInfo.smallAddress }}</a>
    </div>
    <div class="c-select-token-balance">
      <div class="c-select-token-balance-text">{{ balance }}</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { utils } from '@/store/ethers/ethersConnect';
import { HelpCircleIcon } from 'vue-feather-icons';
import { getERC20Contract } from '../utils/contract/getContract';

export default Vue.extend({
  name: 'SelectTokenListItem',
  components: {
    HelpCircleIcon,
  },
  computed: {
    ...mapState('ethers', ['address', 'network', 'networkBrowseMainUrl']),
    ...mapState({
      swapLogo(state) {
        return state.swap.logo;
      },
    }),
    tokenAddressInfo() {
      const smallAddress = `${this.tokenAddress.slice(0, 6)}...${this.tokenAddress.slice(-4)}`;
      const addressLink = `${this.networkBrowseMainUrl}/address/${this.tokenAddress}`;
      const tokenAddressInfo = {
        smallAddress,
        addressLink,
      };
      return tokenAddressInfo;
    },
  },
  data() {
    return {
      balance: '-',
      isHardCodeToken: false,
      errImg: `this.src="${this.swapLogo}"`,
      loading: false,
    };
  },
  props: {
    logo: {
      type: String,
      default: '',
    },
    tokenAddress: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    symbol: {
      type: String,
      default: '',
    },
    // balance: {
    //   type: String,
    //   default: '0',
    // },
    disabled: {
      type: Boolean,
      default: false,
    },
    isYToken: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async fetchDetailInfo() {
      if (!this.tokenAddress || !this.address) {
        return;
      }
      this.loading = true;
      try {
        const contract = getERC20Contract(this.tokenAddress);
        const balance = await contract.balanceOf(this.address);
        const decimals = await contract.decimals();
        const dBalance = utils.formatUnits(balance, decimals);
        this.balance = dBalance;
      } catch (err) {
        console.log(`err: ${this.symbol} ${err}`);
      }
      this.loading = false;
    },
  },
  watch: {
    swapLogo: {
      handler() {
        this.errImg = `this.src="${this.swapLogo}"`;
      },
      immediate: true,
    },
    tokenAddress() {
      this.fetchDetailInfo();
    },
  },
  mounted() {
    this.fetchDetailInfo();
  },
  updated() {
    this.fetchDetailInfo();
  },
});
</script>
<style lang="scss" scoped>
.c-select-token-item {
  display: grid;
  grid-template-columns: auto minmax(auto, 8rem) minmax(0px, 1fr);
  gap: 16px;
  box-sizing: border-box;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  min-width: 0px;
  width: 100%;
  height: 56px;
  margin: 0px;
  padding: 4px 20px;
  cursor: pointer;
  opacity: 1;
  &:hover {
    background-color: rgb(44, 47, 54);
  }
  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
.c-select-token-icon {
  width: 24px;
  height: 24px;
  &-image {
    width: 24px;
    height: 24px;
  }
}
.c-select-token-name {
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  &-text {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 16px;
  }
  &-link {
    font-size: 14px;
  }
}
.c-select-token-balance {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  &-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    text-align: right;
  }
}
.token-edit {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  width: fit-content;
  color: rgb(33, 114, 229);
  font-size: 14px;
}
.te-name {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
  color: rgb(195, 197, 203);
}
.te-edit {
  border: none;
  text-decoration: none;
  background: none;
  cursor: pointer;
  color: rgb(33, 114, 229);
  font-weight: 500;
  user-select: none;
}
</style>
