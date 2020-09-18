<template>
  <LayoutUnitedMint>
    <div class="united-mint-wrap">
      <switch-btn :btn-click="btnClick" :showExpert="showExpert" />
      <united-mint-item
        v-for="(data, index) of mintData"
        :key="index"
        :opened="data.opened"
        :data="data"
        @itemToggle="toggleItem"
        :mode="showExpert ? 'difficult' : 'easy'"
      />
      <!-- <easy-item v-show="!showExpert" /> -->
    </div>
  </LayoutUnitedMint>
</template>

<script>
import LayoutUnitedMint from '@/layouts/LayoutUnitedMint.vue';
import {
  /* CommonERC20, */ yyCrvUnitedMint,
  yswUSDUnitedMint,
  USDT,
  yyCrv,
  yswUSD,
  yyCrvUMContractAddr,
  yswUSDUMContractAddr,
  cYyCrvUnitedMintABI,
  cYswUSDUnitedMintABI,
} from '@/contract/index';
import switchBtn from './components/switchBtn.vue';
import UnitedMintItem from './components/Item.vue';

export default {
  name: 'UnitedMintView',
  data() {
    return {
      showExpert: false,
      mintData: [
        {
          key: 'yYCrv',
          opened: true,
          unitedMintContract: yyCrvUnitedMint,
          unitedMintContractAddr: yyCrvUMContractAddr,
          unitedMintContractABI: cYyCrvUnitedMintABI,
          yToken: yyCrv,
          uToken: USDT,
          apy: 170,
        },
        {
          key: 'yswUSD',
          opened: false,
          unitedMintContract: yswUSDUnitedMint,
          unitedMintContractAddr: yswUSDUMContractAddr,
          unitedMintContractABI: cYswUSDUnitedMintABI,
          yToken: yswUSD,
          uToken: USDT,
          apy: 250,
        },
      ],
    };
  },
  components: {
    LayoutUnitedMint,
    switchBtn,
    UnitedMintItem,
    // easyItem,
  },
  computed: {},
  methods: {
    toggleItem(data) {
      for (let i = 0; i < this.mintData.length; i += 1) {
        if (this.mintData[i].key === data.key) {
          this.mintData[i].opened = !this.mintData[i].opened;
        }
      }
    },
    btnClick() {
      if (this.showExpert) {
        this.showExpert = false;
      } else {
        this.showExpert = true;
      }
    },
  },
  watch: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.united-mint-wrap {
  margin: 0 20px;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  align-items: center;
}
</style>
