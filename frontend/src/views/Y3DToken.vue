<template>
    <div class="y3dToken">
        <div class="not-legit-address" v-if="!isLegitAddress">
            <h1 class="title">Sorry</h1>
            <h2 class="subtitle">But this seems not to be a correct ethereum address.</h2>
            <button class="ui primary button" @click="$router.go(-1)"> Go Back </button>
            <router-link to="/" class="ui button"> Home </router-link>
        </div>
        <div class="legit" v-else>
            <h1 class="title">About this y3d Token Pair</h1>
            <h2 class="subtitle" v-if="isPairLoaded">{{pairName}}</h2>
            <div class="ui message stats" v-if="y3dTokenDetail && underlyingToken">
                <div class="header"></div>
                <div class="stats" style=" text-align: left; ">
                <div class="ui two column very relaxed stackable grid">
                    <div class="column">
                       <p> Name: {{underlyingToken.name}}
                           <br/>
                           Symbol: {{underlyingToken.symbol}} </p>
                    <p> Balance:
                        <code>{{underlyingToken.dBalance}}</code> {{underlyingToken.symbol}}
                    </p>
                <p>
                    Address: <code>{{y3dTokenDetail.underlying}}</code>
                    <br/>
                    <CheckoutAtEtherscan :contract="y3dTokenDetail.underlying" />
                </p>
                    </div>
                    <div class="middle aligned column">
                    <p> Name: {{y3dTokenDetail.name}} <br/> Symbol: {{y3dTokenDetail.symbol}} </p>
                    <p>
                        Balance: <code>{{y3dTokenDetail.dBalance}}</code> {{y3dTokenDetail.symbol}}
                    </p>
                <p>
                    Address: <code>{{contractAddress}}</code>
                    <br/>
                    <CheckoutAtEtherscan :contract="contractAddress" />
                </p>
                    </div>
                </div>
                <div class="ui vertical divider"></div>
            </div>
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
import { mapState } from 'vuex';
import CheckoutAtEtherscan from '../components/CheckoutAtEtherscan.vue';
import { y3DToken, CommonERC20 } from '../contract';
import { getProvider, utils } from '../store/ethers/ethersConnect';

/* eslint no-underscore-dangle: ["error", { "allow": ["_u", "_y"] }] */
export default {
  name: 'Y3DToken',
  components: {
    CheckoutAtEtherscan,
  },
  props: {
    contractAddress: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    y3dTokenDetail: null,
    underlyingToken: null,
  }),
  computed: {
    ...mapState('ethers', ['address']),
    isLegitAddress() {
      return utils.isAddress(this.contractAddress);
    },
    isPairLoaded() {
      return this.y3dTokenDetail && this.underlyingToken;
    },
    pairName() {
      if (!this.isPairLoaded) return '';
      return `${this.underlyingToken.symbol} / ${this.y3dTokenDetail.symbol}`;
    },
  },
  methods: {
    getContract() {
      return y3DToken
        .attach(this.contractAddress)
        .connect(getProvider().getSigner());
    },
    getERC20(_address) {
      return CommonERC20
        .attach(_address)
        .connect(getProvider().getSigner());
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
      // balance that for display
      const dBalance = utils.formatUnits(balance, decimals);
      return {
        name, symbol, totalSupply, decimals, balance, dBalance,
      };
    },
    async fetchTokenInfo() {
      // Get underlying token data
      const contract = this.getContract();
      const underlying = await contract._u();

      // get y3d token and underlying token info as ERC20
      const [uTokenDetail, y3dTokenDetail] = await Promise.all([
        this.fetchERC20Detail(underlying),
        this.fetchERC20Detail(this.contractAddress),
      ]);

      this.y3dTokenDetail = { underlying, ...y3dTokenDetail };
      this.underlyingToken = uTokenDetail;
    },
    stake() {
    },
  },
  mounted() {
    this.fetchTokenInfo();
  },
};
</script>
