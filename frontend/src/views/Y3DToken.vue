<template>
    <div class="y3dToken">
        <div class="not-legit-address" v-if="!isLegitAddress">
            <h1 class="title">Sorry</h1>
            <h2 class="subtitle">But this seems not to be a correct ethereum address.</h2>
            <button class="ui primary button" @click="$router.go(-1)"> Go Back </button>
            <router-link to="/" class="ui button"> Home </router-link>
        </div>
        <div class="legit" v-else-if="isPairLoaded">
            <h1 class="title">About this y3d Token Pair</h1>
            <h2 class="subtitle">{{pairName}}</h2>
            <div class="Actions">
                <div class="ui cards">
                <div class="card">
                    <div class="content">
                    <div class="header">Underlying Token</div>
                    <div class="description">
                        <p> Name: {{uTD.name}}
                           <br/>
                           Symbol: {{uTD.symbol}} </p>
                        <p> Balance:
                            <code>{{uTD.dBalance}}</code> {{uTD.symbol}}
                        </p>
                        <p>
                            Address: <code>{{y3dTD.underlying}}</code>
                            <br/>
                            <CheckoutAtEtherscan :contract="y3dTD.underlying" />
                        </p>
                    </div>
                    </div>
                    <div class="ui bottom attached button"><i class="add icon"></i> 添加好友 </div>
                </div>
                <div class="card">
                    <div class="content">
                    <div class="header">Y3D Token</div>
                    <div class="description">
                        <p> Name: {{y3dTD.name}}
                            <br/>
                            Symbol: {{y3dTD.symbol}} </p>
                        <p>
                            Balance: <code>{{y3dTD.dBalance}}</code> {{y3dTD.symbol}}
                        </p>
                        <p>
                        Address: <code>{{contractAddress}}</code>
                        <br/>
                        <CheckoutAtEtherscan :contract="contractAddress" />
                        </p>
                    </div>
                    </div>
                    <div class="ui bottom attached button"><i class="add icon"></i> 添加好友 </div>
                </div>
                </div>
                <div class="actions">
                    <button class="ui primary button"
                        :disabled="isSendingTx"
                        :class="isSendingTx && 'loading'"
                        @click="stake"> Stake </button>
                    <button class="ui button"
                        :disabled="isSendingTx"
                        :class="isSendingTx && 'loading'"
                        @click="unstake"> Unstake </button>
                    <a v-if="lastTxHash" class="ui button"
                        :href="lastTxLink" target="_blank"
                        rel="noopener noreferrer">
                        Check Last tx on Etherscan ↗️
                    </a>
                </div>
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
    y3dTD: null,
    uTD: null,
    isSendingTx: false,
    lastTxHash: '',
  }),
  computed: {
    ...mapState('ethers', ['address']),
    isLegitAddress() {
      return utils.isAddress(this.contractAddress);
    },
    isPairLoaded() {
      return this.y3dTD && this.uTD;
    },
    pairName() {
      if (!this.isPairLoaded) return '';
      return `${this.uTD.symbol} / ${this.y3dTD.symbol}`;
    },
    lastTxLink() {
      return `http://rinkeby.etherscan.io/tx/${this.lastTxHash}`;
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
      const [uTokenDetail, y3dTD] = await Promise.all([
        this.fetchERC20Detail(underlying),
        this.fetchERC20Detail(this.contractAddress),
      ]);

      this.y3dTD = { underlying, ...y3dTD };
      this.uTD = { address: underlying, ...uTokenDetail };
    },
    async stake() {
      this.isSendingTx = true;
      const uTContract = this.getERC20(this.uTD.address);
      const user = this.address;
      const approvedAmount = await uTContract.allowance(user, this.contractAddress);
      const enteredAmount = prompt('Please enter stake amount:');
      if (!enteredAmount) {
        this.isSendingTx = false;
        return;
      }
      const uTokenUnit = this.uTD.decimals;
      const parsedInput = utils.parseUnits(enteredAmount, uTokenUnit);
      if (parsedInput.gt(this.uTD.balance)) {
        alert("You don't have so much token, sorry.");
        this.isSendingTx = false;
        return;
      }
      if (parsedInput.gt(approvedAmount)) {
        const txRes = await uTContract.approve(this.contractAddress, parsedInput);
        await txRes.wait(1);
      }
      const y3dT = this.getContract();
      const stakeRes = await y3dT.stake(parsedInput);
      const stakeReceipt = await stakeRes.wait(1);
      console.info('stake::receipt', stakeReceipt);
      alert('Stake successfully.');
      this.lastTxHash = stakeReceipt.transactionHash;
      this.isSendingTx = false;
    },
    async unstake() {
      this.isSendingTx = true;
      const enteredAmount = prompt('Please enter unstake amount:');
      if (!enteredAmount) {
        this.isSendingTx = false;
        return;
      }
      const yTokenUnit = this.y3dTD.decimals;
      const parsedInput = utils.parseUnits(enteredAmount, yTokenUnit);
      if (parsedInput.gt(this.y3dTD.balance)) {
        alert("You don't have so much y3dToken, sorry.");
        this.isSendingTx = false;
        return;
      }
      const y3dT = this.getContract();
      const stakeRes = await y3dT.unstake(parsedInput);
      const unstakeReceipt = await stakeRes.wait(1);
      console.info('unstake::receipt', unstakeReceipt);
      alert('Unstake successfully.');
      this.lastTxHash = unstakeReceipt.transactionHash;
      this.isSendingTx = false;
    },
  },
  mounted() {
    this.fetchTokenInfo();
  },
};
</script>

<style scoped>
.card {
    max-width: 48% !important;
    width: 48% !important;
}
</style>
