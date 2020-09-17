/* eslint-disable max-len */
<template>
  <Modal v-model="dialogVisibleSelectToken" :customClass="customClass" :width="width">
    <template v-slot:header>
      Select a token
      <span style="margin-left: 4px">
        <div style="display: inline-block">
          <HelpTooltip
            placement="bottom"
            content
              ="Find a token by searching for its name or symbol or by pasting its address below."
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
      <div class="select-token-model-filter">
        <div class="select-token-model-filter-text">Token Name</div>
        <div class="select-token-model-filter-button">
          <div class="select-token-model-filter-text">↓</div>
        </div>
      </div>
      <div class="select-token-model-list">
        <template v-if="searchTokenList.length <= 0">
          <SelectTokenListItem
            v-for="(item, idx) in originalList"
            :key="idx"
            :symbol="item.symbol"
            :name="item.symbol"
            :logo="item.logo"
            :balance="item.dBalance"
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
            :balance="item.dBalance"
            @on-click="selectToken(item)"
          />
        </template>
      </div>
    </div>
  </Modal>
</template>

<script>
import { debounce, sortBy, find } from 'lodash';
import { mapState } from 'vuex';
import Modal from './Modal.vue';
import HelpTooltip from './HelpTooltip.vue';
import SelectTokenListItem from './SelectTokenListItem.vue';
import { CommonERC20 } from '../contract';
import { getProvider, utils } from '../store/ethers/ethersConnect';

export default {
  components: {
    Modal,
    HelpTooltip,
    SelectTokenListItem,
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
      default: '480px',
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
  computed: {
    ...mapState('ethers', ['address']),
  },
  data() {
    return {
      // TronLink,
      dialogVisibleSelectToken: this.value,
      tokenNameOrAddress: '',
      searchTokenList: [],
      commonBases: [],
      originalList: [
        {
          symbol: 'FUSDT',
          address: '0x7f76315337E63482043F92A1bD4784290159AD6f',
          tag: 'uToken',
          yToken: 'yFUSDT3d',
        },
        {
          symbol: 'fy3d',
          address: '0x7a672B200f906D56E8B528413d02D12abABcc231',
          tag: 'uToken',
          yToken: 'yfy3d3d',
        },
        {
          symbol: 'SHUIHU',
          address: '0xA56d8FD390D6dAc025070100b49010720Db5A685',
          tag: 'uToken',
          yToken: 'ySHUIHU3d',
        },
        {
          symbol: 'yFUSDT3d',
          address: '0x14Ac98d0B38ACce572c76c76501ABD648Eefea6f',
          tag: 'y_3dToken',
          uToken: 'FUSDT',
        },
        {
          symbol: 'yfy3d3d',
          address: '0x2e34f61ffa1605da4ee88a6d10e5d75ba8ce246b',
          tag: 'y_3dToken',
          uToken: 'fy3d',
        },
        {
          symbol: 'ySHUIHU3d',
          address: '0x1d8c0ef5639445faca65951423dec250bd0e68fc',
          tag: 'y_3dToken',
          uToken: 'SHUIHU',
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
    // eslint-disable-next-line func-names
    searchToken: debounce(async function (val) {
      const res = await this.fetchERC20Detail({
        address: val,
      });
      const fined = find(this.originalList, (o) => o.address === res.address);
      this.searchTokenList.push(fined || res);
    }, 300),
    selectToken(item) {
      this.$emit('select-token', {
        data: item,
        symbol: this.symbol,
      });
      this.dialogVisibleSelectToken = false;
    },
    async fetchBalanceOfDefaultList() {
      const [...rest] = this.originalList;
      const result = (
        await Promise.all(rest.map((item) => this.fetchERC20Detail(item)))
      ).map(({ balance, ...res }) => ({ ...res, balance: balance.toString() }));
      console.log('fetchBalanceOfDefaultList result', result);
      this.originalList = [...result];
      this.originalList = sortBy(this.originalList, 'balance').reverse();
    },
    getERC20(_address) {
      return CommonERC20.attach(_address).connect(getProvider().getSigner());
    },
    async fetchERC20Detail(item) {
      // eslint-disable-next-line no-underscore-dangle
      const _address = item.address;
      const contract = this.getERC20(_address);
      const [name, symbol, totalSupply, decimals, balance] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.totalSupply(),
        contract.decimals(),
        contract.balanceOf(this.address),
      ]);
      // balance that for display
      const dBalance = utils.formatUnits(balance, decimals);
      return {
        ...item,
        name,
        symbol,
        totalSupply,
        decimals,
        balance,
        dBalance,
      };
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
