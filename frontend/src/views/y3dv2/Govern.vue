<template>
  <LayoutY3DV2>
    <div class="govern">
      <div class="govern-container">
        <div>
          <span class="title-text">{{ $t('govern.selectAddress') }}</span>
        </div>
        <div class="selection" @click="shownSelectTokenModal = true">
          <p v-if="!value || value === ''">{{ $t('govern.selectToken') }}</p>
          <div class="token-info" v-else>
            <img src="@/assets/base/y3d.png" />
            <p>{{ y3dTD && y3dTD.symbol }}</p>
          </div>
          <IconTokenSelectArrow />
        </div>
        <div class="blank-container">
          <div class="blank-container-wrap" v-if="uTD && y3dTD">
            <div class="blank-container-info-wrap">
              <div class="blank-container-info">
                <p class="blank-container-info-name">
                  {{ $t('govern.symbolStacked', { symbol: uTD.symbol }) }}
                </p>
                <p class="blank-container-info-value">{{ formatGrovernInfo(y3dTD.staked) }}</p>
              </div>
              <div class="contract-info">
                <img src="@/assets/base/copy.png" />
                <a :href="'https://rinkeby.etherscan.io/address/' + uTD.address" target="__blank"><p>{{ uTD.address }}</p></a>
              </div>
            </div>
            <div class="blank-container-info-wrap">
              <div class="blank-container-info">
                <p class="blank-container-info-name">
                  {{ $t('govern.symbolSupply', { symbol: y3dTD.symbol }) }}
                </p>
                <p class="blank-container-info-value">{{ formatGrovernInfo(y3dTD.supply) }}</p>
              </div>
              <div class="contract-info">
                <img src="@/assets/base/copy.png" />
                <a :href="'https://rinkeby.etherscan.io/address/' + value" target="__blank"><p>{{ value }}</p></a>
              </div>
            </div>
            <div class="blank-container-info">
              <p class="blank-container-info-name">
                {{ $t('govern.symbolPrice', { symbol: y3dTD.symbol }) }}
              </p>
              <p class="blank-container-info-value">{{ formatGrovernInfo(y3dTD.price) }}$</p>
            </div>
            <div class="blank-container-info">
              <p class="blank-container-info-name">
                {{ $t('govern.symbolMining', { symbol: uTD.symbol }) }}
              </p>
              <p class="blank-container-info-value">{{
                formatGrovernInfo(y3dTD.miningAmount)
              }}({{ formatGrovernInfo(y3dTD.miningRatio) }}%)</p>
            </div>
            <div class="blank-container-info">
              <p class="blank-container-info-name">{{ $t('govern.p3dRatio') }}</p>
              <p class="blank-container-info-value">{{ formatGrovernInfo(y3dTD.p3DRatio) }}</p>
            </div>
            <div class="blank-container-info">
              <p class="blank-container-info-name">{{ $t('govern.timelock') }}</p>
              <p class="blank-container-info-value">{{ formatGrovernInfo(y3dTD.timelock) }}</p>
            </div>
            <!-- <div class="blank-container-info">
              <p class="blank-container-info-name">{{ $t('govern.createdTime') }}</p>
              <p class="blank-container-info-value">{{ formatGrovernInfo(y3dTD.createdTime) }}</p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <SelectTokenModal
      :isUToken="false"
      v-model="shownSelectTokenModal" @select-token="selectToken"></SelectTokenModal>
  </LayoutY3DV2>
</template>
<script lang="ts">
/* eslint-disable no-unused-vars */
/* eslint no-underscore-dangle: ["error", { "allow": ["_u", "_y"] }] */
/* eslint-disable no-alert */
import Vue from 'vue';
import LayoutY3DV2 from '@/layouts/LayoutY3DV2.vue';
import { mapState } from 'vuex';
import {
  fetchERC20Detail, IERC20DetailInfo, IUTokenDetailInfo, IYTokenDetailInfo,
} from '@/utils/contract/fetchContractInfo';
import { formatGrovernInfo } from '@/utils/formatter/formatGrovernInfo';
import { getY3DContract } from '@/utils/contract/getContract';
import SelectTokenModal, { ITokenListItem } from '@/components/SelectTokenModal.vue';
import IconTokenSelectArrow from '@/components/Icons/IconTokenSelectArrow.vue';
import { formatUnits } from 'ethers/lib/utils';

export interface IGovernData {
  shownSelectTokenModal: boolean
  loadingTokenInfo: boolean
  y3dTD: IYTokenDetail | null
  uTD: IUTokenDetail | null
  value: string
  options: Array<IOptionListItem>
  optionsY3dTokenInfo: Array<IOptionY3dTokenInfoListItem>
}

export interface IYTokenDetail extends IYTokenDetailInfo {
  staked?: string
  supply?: string
  price?: number
  miningAmount?: string
  miningRatio?: number
  p3DRatio?: number
  timelock?: string
  createdTime?: string
}

export interface IUTokenDetail extends IUTokenDetailInfo {}

export interface IOptionListItem {
  token: {
    y3dToken: string
  }
}

export type IOptionY3dTokenInfoListItem = IOptionListItem & IERC20DetailInfo

export interface ISelectTokenParam {
  data: ITokenListItem
  symbol: string
}

export default Vue.extend({
  components: {
    LayoutY3DV2,
    SelectTokenModal,
    IconTokenSelectArrow,
  },
  data(): IGovernData {
    return {
      shownSelectTokenModal: false,
      loadingTokenInfo: false,
      y3dTD: null,
      uTD: null,
      value: '',
      options: [],
      optionsY3dTokenInfo: [],
    };
  },
  computed: {
    ...mapState('ethers', ['address']),
  },
  watch: {
    value() {
      this.uTD = null;
      this.y3dTD = null;
      if (this.value) {
        this.fetchTokenInfo();
      }
    },
    address() {
      this.fetchOptionsTokenInfo();
      if (this.uTD === null && this.y3dTD === null && this.value) {
        this.fetchTokenInfo();
      }
    },
  },
  mounted() {
    this.value = this.$route.query.token as string;
    this.fetchOptionsTokenInfo();
  },
  methods: {
    async fetchOptionsTokenInfo() {
      const result = await Promise.all(
        this.options.map(async (item: IOptionListItem) => {
          const r = await fetchERC20Detail(item.token.y3dToken, this.address);
          return {
            ...item,
            ...r,
          };
        }),
      );
      this.optionsY3dTokenInfo = result;
    },
    async fetchTokenInfo() {
      this.loadingTokenInfo = true;
      const contract = getY3DContract(this.value);
      let underlying: string = '';
      try {
        underlying = await contract._u();
      } catch (err) {
        const cname = await contract.name();
        const uname = cname.substr(1, cname.length - 1);
        underlying = await contract[uname]();
      }
      const [uTokenDetail, y3dTD] = await Promise.all([
        fetchERC20Detail(underlying, this.address),
        fetchERC20Detail(this.value, this.address),
      ]);
      // eslint-disable-next-line no-underscore-dangle
      const yTStaked = formatUnits(await contract.pool(), y3dTD.decimals);
      const yTSupply = formatUnits(y3dTD.totalSupply, y3dTD.decimals);
      const yTPrice = Math.round((Number(yTStaked) / Number(yTSupply)) * 1.05 * 1000) / 1000;
      this.y3dTD = {
        ...this.y3dTD,
        underlying,
        ...y3dTD,
        staked: yTStaked,
        supply: yTSupply,
        price: yTPrice,
      };
      this.uTD = { ...this.uTD, address: underlying, ...uTokenDetail };
      this.loadingTokenInfo = false;
    },
    selectToken(token: ISelectTokenParam) {
      this.value = token.data.address;
    },
    formatGrovernInfo,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/color';
.govern-container {
  margin-top: 10px;
}

.title-text {
  font-size: 17px;
  margin-left: 5px;
}

.selection {
  display: flex;
  align-items: center;
  margin-top: 16px;
  border: 1px solid #555555;
  height: 60px;
  border-radius: 16px;
  padding: 0 24px;
  p {
    color: #B2B2B2;
    font-size: 16px;
    flex-grow: 1;
    margin: 0;
  }
  .token-info {
    display: flex;
    align-items: center;
    flex-grow: 1;
    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
    p {
      font-size: 16px;
      color: white;
    }
  }
}
.selection:hover {
  opacity: 0.7;
}

.blank-container {
  min-height: 200px;
  width: 100%;
  border: 2px solid #777;
  border-radius: 15px;
  margin-top: 16px;
  padding: 16px 20px;
  &-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    p {
      font-size: 14px;
      margin: 0;
    }
    &-name {
      color: #b2b2b2;
      width: 35%;
      margin-right: 32px;
    }
    &-value {
      flex: 1;
      color: #FFFFFF;
      text-align: right;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &-wrap {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
      .blank-container-info {
        margin-bottom: 0px;
      }
    }
  }
  .contract-info {
    display: flex;
    align-items: center;
    margin-left: 16px;
    img {
      width: 12px;
      height: 12px;
      margin-right: 8px;
    }
    a,
    p {
      font-size: 12px;
      // max-width: 80px;
      // text-overflow: ellipsis;
      // overflow: hidden;
      margin: 0;
      color: $y3d-blue;
      text-decoration: underline;
      white-space: nowrap;
    }
  }
}

.el-select {
  width: 100%;
}

::v-deep .el-select > .el-input > input {
  background-color: #333;
  border: 1px solid #555555;
  outline: none;
  color: white;
  height: 60px;
  border-radius: 16px;
}
</style>

<style>
.el-popper {
  background-color: #333 !important;
  border: 1px solid #111;
  margin-top: 0 !important;
  width: 0px;
}
.el-select-dropdown__item.hover {
  background-color: #333;
  color: white;
}
.el-select-dropdown__item {
  padding: 0;
  height: 50px;
}
.popper__arrow {
  display: none !important;
}
</style>
