<template>
    <div class="y3dToken">
        <div class="not-legit-address" v-if="!isLegitAddress">
            <h1 class="title">Sorry</h1>
            <h2 class="subtitle">But this seems not to be a correct ethereum address.</h2>
            <button class="ui primary button" @click="$router.go(-1)"> Go Back </button>
            <router-link to="/" class="ui button"> Home </router-link>
        </div>
        <div class="legit" v-else>
            <div class="ui message stats" v-if="y3dTokenDetail">
                <div class="header">About this y3d Token</div>
                <p> Token Name: {{y3dTokenDetail.name}} </p>
                <p> Symbol: {{y3dTokenDetail.symbol}} </p>
            </div>
                <div class="ui icon message" v-else>
                    <i class="notched circle loading icon"></i>
                    <div class="content">
                        <div class="header">Fetching Data now</div>
                        <p>It takes time to talk with blockchain, please wait.</p>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import { y3DToken } from '../contract';
import { getProvider, utils } from '../store/ethers/ethersConnect';

export default {
  name: 'Y3DToken',
  props: {
    contractAddress: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    y3dTokenDetail: null,
  }),
  computed: {
    isLegitAddress() {
      return utils.isAddress(this.contractAddress);
    },
  },
  methods: {
    getContract() {
      return y3DToken
        .attach(this.contractAddress)
        .connect(getProvider().getSigner());
    },
    async fetchTokenInfo() {
      const contract = this.getContract();
      const [name, symbol] = await Promise.all([contract.name(), contract.symbol()]);
      this.y3dTokenDetail = { name, symbol };
    },
    stake() {
    },
  },
  async mounted() {
    await this.fetchTokenInfo();
  },
};
</script>
