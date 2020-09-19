<template>
  <LayoutY3DV2>
    <div class="govern">
      <div class="govern-container">
        <div>
          <span class="title-text">Select A y3dToken Address</span>
        </div>
        <div class="selection" @click="shownSelectTokenModal = true">
          <p v-if="!value || value === ''">Select a token</p>
          <div class="token-info" v-else>
            <img src="@/assets/base/y3d.png" />
            <p>{{ y3dTD && y3dTD.symbol }}</p>
          </div>
          <IconTokenSelectArrow />
        </div>
        <div class="blank-container">
          <div class="blank-container-wrap" v-if="uTD && y3dTD">
            <div class="blank-container-wrap-info">
              <p class="info-name">{{ uTD.symbol }} stacked</p>
              <div class="contract-info">
                <img src="@/assets/base/copy.png" />
                  <a :href="'https://rinkeby.etherscan.io/address/' + uTD.address" target="__blank"><p>{{ uTD.address }}</p></a>
              </div>
              <p class="info-value">--</p>
            </div>
            <div class="blank-container-wrap-info">
              <p class="info-name">{{ y3dTD.symbol }} supply</p>
              <div class="contract-info">
                <img src="@/assets/base/copy.png" />
                  <a :href="'https://rinkeby.etherscan.io/address/' + value" target="__blank"><p>{{ value }}</p></a>
              </div>
              <p class="info-value">--</p>
            </div>
            <div class="blank-container-wrap-info">
              <p class="info-name">{{ y3dTD.symbol }} price</p>
              <p class="info-value">--</p>
            </div>
            <div class="blank-container-wrap-info">
              <p class="info-name">Mining {{ uTD.symbol }}</p>
              <p class="info-value">--(--%)</p>
            </div>
            <div class="blank-container-wrap-info">
              <p class="info-name">P3D ratio</p>
              <p class="info-value">--</p>
            </div>
            <div class="blank-container-wrap-info">
              <p class="info-name">Timelock</p>
              <p class="info-value">--</p>
            </div>
            <div class="blank-container-wrap-info">
              <p class="info-name">Created time</p>
              <p class="info-value">--</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SelectTokenModal
      :isUToken="false"
      v-model="shownSelectTokenModal" @select-token="selectToken"></SelectTokenModal>
  </LayoutY3DV2>
</template>
<script>
import Vue from 'vue';
import LayoutY3DV2 from '@/layouts/LayoutY3DV2.vue';
import { mapState } from 'vuex';
import { y3DToken, CommonERC20 } from '@/contract';
import { getProvider, utils } from '@/store/ethers/ethersConnect';
import SelectTokenModal from '@/components/SelectTokenModal.vue';
import IconTokenSelectArrow from '@/components/Icons/IconTokenSelectArrow.vue';

/* eslint no-underscore-dangle: ["error", { "allow": ["_u", "_y"] }] */
/* eslint-disable no-alert */
export default Vue.extend({
  components: {
    LayoutY3DV2,
    SelectTokenModal,
    IconTokenSelectArrow,
  },
  data() {
    return {
      shownSelectTokenModal: false,
      loadingTokenInfo: false,
      y3dTD: null,
      uTD: null,
      value: '',
    };
  },
  computed: {
    ...mapState('ethers', ['address']),
  },
  watch: {
    value() {
      this.uTD = null;
      this.y3dTD = null;
      this.fetchTokenInfo();
    },
    address() {
      this.fetchOptionsTokenInfo();
    },
  },
  mounted() {
    this.fetchOptionsTokenInfo();
  },
  methods: {
    async fetchOptionsTokenInfo() {
      const result = await Promise.all(
        this.options.map(async (item) => {
          const r = await this.fetchERC20Detail(item.token.y3dToken);
          return {
            ...item,
            ...r,
          };
        }),
      );
      this.optionsY3dTokenInfo = result;
    },
    getContract() {
      return y3DToken.attach(this.value).connect(getProvider().getSigner());
    },
    getERC20(_address) {
      return CommonERC20.attach(_address).connect(getProvider().getSigner());
    },
    async fetchERC20Detail(_address) {
      const contract = this.getERC20(_address);
      const [name, symbol, totalSupply, decimals, balance] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.totalSupply(),
        contract.decimals(),
        contract.balanceOf(this.address),
      ]);
      const dBalance = utils.formatUnits(balance, decimals);
      return {
        name,
        symbol,
        totalSupply,
        decimals,
        balance,
        dBalance,
      };
    },
    async fetchTokenInfo() {
      this.loadingTokenInfo = true;
      const contract = this.getContract();
      const underlying = await contract._u();
      const [uTokenDetail, y3dTD] = await Promise.all([
        this.fetchERC20Detail(underlying),
        this.fetchERC20Detail(this.value),
      ]);
      this.y3dTD = { underlying, ...y3dTD };
      this.uTD = { address: underlying, ...uTokenDetail };
      this.loadingTokenInfo = false;
    },
    selectToken(token) {
      this.value = token.data.address;
    },
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
  .blank-container-wrap {
    padding: 16px 20px;
    .blank-container-wrap-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      p {
        font-size: 14px;
        margin: 0;
      }
      .info-name {
        color: #b2b2b2;
        width: 35%;
      }
      .info-value {
        color: #FFFFFF;
      }
      .contract-info {
        display: flex;
        align-items: center;
        img {
          width: 14px;
          height: 14px;
          margin-right: 8px;
        }
        a,
        p {
          max-width: 80px;
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 0;
          color: $y3d-blue;
          text-decoration: underline;
          white-space: nowrap;
        }
      }
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
