/* eslint-disable max-len */
<template>
  <Modal v-model="dialogVisibleSelectToken" :customClass="customClass" :width="width">
    <template v-slot:header>
      Select a token
      <span style="margin-left: 4px">
        <div style="display: inline-block">
          <HelpTooltip
            placement="bottom"
            content=
              "Find a token by searching for its name or symbol or by pasting its address below."
          ></HelpTooltip>
        </div>
      </span>
    </template>
    <div class="select-token-model-body">
      <div class="select-token-model-search">
        <input
          type="text"
          id="token-search-input"
          placeholder="Search name or paste address"
          class="select-token-model-input"
          v-model="tokenNameOrAddress"
        />
      </div>
      <div class="common-bases" v-if="commonBasesShow">
        <div class="cb-header">
          <div class="cbh-title">Common bases</div>
          <span style="margin-left: 4px">
            <div style="display: inline-block">
              <HelpTooltip
                placement="bottom"
                content="These tokens are commonly paired with other tokens."
              ></HelpTooltip>
            </div>
          </span>
        </div>
        <div class="cb-item">
          <div
            class="cbi-token"
            v-for="(item, idx) in commonBases"
            :key="idx"
            @click="selectToken(item)"
          >
            <img :src="item.logo" class="cbit-logo" v-if="item.logo" />
            <HelpCircleIcon v-else class="cbit-symbol-help"></HelpCircleIcon>
            <div class="cbit-symbol">{{ item.symbol }}</div>
          </div>
        </div>
      </div>
      <div class="select-token-model-filter">
        <div class="select-token-model-filter-text">Token Name</div>
        <div class="select-token-model-filter-button">
          <div class="select-token-model-filter-text">↓</div>
        </div>
      </div>
      <div class="select-token-model-list">
        <!-- <template v-if="searchTokenList.length <= 0">
          <SelectTokenListItem
            v-for="(item, idx) in originalList"
            :key="idx"
            :symbol="item.symbol"
            :name="item.symbol"
            :logo="item.logo"
            :balance="0"
            @on-click="selectToken(item)"
          />
        </template>
        <template v-else>
          <SelectTokenListItem
            v-for="(item, idx) in searchTokenList"
            :key="idx"
            :symbol="item.symbol"
            :name="item.name"
            :logo="item.logo"
            :balance="0"
            @on-click="selectToken(item)"
          />
        </template> -->
      </div>
    </div>
  </Modal>
</template>

<script>
import { debounce } from 'lodash';
import Modal from './Modal.vue';
import HelpTooltip from './HelpTooltip.vue';
// import { formatUnits } from 'ethers/utils';
// import { contractAddress } from '@/constant';
// import TronLink from '../assets/media/TronLink.svg';

// import { getTrc20Detail } from '../tron/index';

export default {
  components: {
    Modal,
    HelpTooltip,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '420px',
    },
    // 根据symbol知道是那个地方触发的modal
    symbol: {
      type: String,
      default: '',
    },
    commonBasesShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // TronLink,
      dialogVisibleSelectToken: this.value,
      tokenNameOrAddress: '',
      searchTokenList: [],
      commonBases: [
        {
          address: 'TRX',
          name: 'TRX',
          symbol: 'TRX',
          decimals: 6,
          balance: '0',
          logo: '', // TronLink,
        },
        {
          address: '', // contractAddress.WTRX,
          name: 'WTRX',
          symbol: 'WTRX',
          decimals: 6,
          balance: '0',
          logo: '',
        },
      ],
      originalList: [
        {
          address: 'TRX',
          name: 'TRX',
          symbol: 'TRX',
          decimals: 6,
          balance: '0',
          logo: '', // TronLink,
        },
        {
          address: '', // contractAddress.WTRX,
          name: 'WTRX',
          symbol: 'WTRX',
          decimals: 6,
          balance: '0',
          logo: '', // TronLink,
        },
        {
          address: 'TXs6kgLRrRNqPc2CCqbQ9rNKchkXzkcUvg',
          name: 'Frank A 0912',
          symbol: 'FA2',
          decimals: 18,
          balance: '0',
          logo: '',
        },
        {
          address: 'TJK63HSGzoNHtFiHakx2xJzwnLHjPBgpep',
          name: 'Frank B 0912',
          symbol: 'FB2',
          decimals: 18,
          balance: '0',
          logo: '',
        },
      ],
    };
  },
  watch: {
    value(newVal) {
      this.dialogVisibleSelectToken = newVal;
      if (newVal) this.fetchBalanceOfDefaultList();
    },
    dialogVisibleSelectToken(newVal) {
      this.$emit('input', newVal);
      if (!newVal) {
        this.searchTokenList = [];
        this.tokenNameOrAddress = '';
      }
    },
    tokenNameOrAddress(newVal) {
      if (newVal.trim()) {
        this.searchToken(newVal);
      } else {
        this.searchTokenList = [];
      }
    },
  },
  methods: {
    displayableBalance() {
      return 0; // formatUnits(this.tronweb.balance, 6);
    },
    // eslint-disable-next-line func-names
    searchToken: debounce(async function (val) {
      console.log(val);
      // const res = await getTrc20Detail(val, this.tronweb.account);
      // console.log('res', res);
      this.searchTokenList.push([]);
    }, 300),
    selectToken(item) {
      this.$emit('select-token', {
        data: item,
        symbol: this.symbol,
      });
      this.dialogVisibleSelectToken = false;
    },
    async fetchBalanceOfDefaultList() {
      // const user = this.tronweb.account || window.tronWeb.defaultAddress.base58;
      // if (!user) return;
      // const [trx, ...rest] = this.originalList;
      // const trxBalance = await window.tronWeb.trx.getBalance(user);
      // console.log('trxBalance', trxBalance);
      // const result = (
      //   await Promise.all(rest.map((item) => getTrc20Detail(item.address, user)))
      // ).map(({ balance, ...res }) => ({ ...res, balance: balance.toString() }));
      // console.log('result', result);
      // trx.balance = trxBalance;
      // this.originalList = [trx, ...result];
    },
  },
};
</script>

<style lang="scss" scoped>
.select-token-model-body {
  display: block;
}
.select-token-model-search {
  padding: 0 20px;
  margin-bottom: 14px;
}
.select-token-model-input {
  box-sizing: border-box;
  padding: 16px;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background: none;
  outline: none;
  border-radius: 20px;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(64, 68, 79);
  appearance: none;
  font-size: 18px;
  transition: border 100ms ease 0s;
  &:hover {
    border: 1px solid rgb(33, 114, 229);
    outline: none;
  }
}
.select-token-model-filter {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 14px;
  &-text {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-size: 14px;
    font-weight: 500;
  }
  &-button {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: fit-content;
    padding: 8px;
    background-color: rgb(44, 47, 54);
    color: rgb(255, 255, 255);
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
  }
}
.select-token-model-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(44, 47, 54);
  height: 500px;
  overflow-y: auto;
}
.common-bases {
  display: grid;
  grid-auto-rows: auto;
  row-gap: 12px;
  padding: 0 20px;
  margin-bottom: 14px;
}
.cb-header {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  flex-wrap: wrap;
  .cbh-title {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 14px;
  }
}
.cb-item {
  box-sizing: border-box;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  flex-wrap: wrap;
  margin: -4px;
  & > * {
    margin: 4px;
  }
}
.cbi-token {
  border: 1px solid rgb(64, 68, 79);
  border-radius: 10px;
  display: flex;
  padding: 6px;
  -webkit-box-align: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: rgb(44, 47, 54);
  }

  .cbit-logo {
    width: 24px;
    height: 24px;
    box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
    border-radius: 24px;
    margin-right: 8px;
  }
  .cbit-symbol {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 16px;
  }
  .cbit-symbol-help {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
}
</style>
