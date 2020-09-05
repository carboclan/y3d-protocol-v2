<template>
  <div class="create">
    <h1 class="title">Create A y3d Token</h1>
    <div class="ui icon message" v-if="deploying">
        <i class="notched circle loading icon"></i>
        <div class="content">
            <div class="header">Please wait in patience</div>
            <p>Deploying your Y3D Token to the blockchain now.</p>
        </div>
    </div>
    <div class="ui positive message" v-if="deployedY3dToken">
        <i class="close icon"></i>
        <div class="header">Your y3dToken is ready.</div>
        <p> Contract Address: {{deployedY3dToken}} </p>
        <button class="ui primary button" @click="goToY3dContract">Go Y3D Token page</button>
    </div>
    <form class="ui form">
      <div class="field">
        <label>Underlying Token</label>
        <input type="text" placeholder="Enter Token Contract address..." v-model="tokenContract" />
      </div>
      <div class="field">
        <label>yToken</label>
        <input type="text" placeholder="Enter yToken Contract address..."
          v-model="yTokenContract" />
      </div>
      <button type="button" class="ui primary button" @click="create_y3dToken">Create</button>
    </form>
  </div>
</template>

<script>
import { getProvider, utils } from '../store/ethers/ethersConnect';
import { y3dFactory } from '../contract';

export default {
  name: 'CreateToken',
  data: () => ({
    tokenContract: '',
    yTokenContract: '',
    deploying: false,
    deployedY3dToken: '',
  }),
  computed: {},
  methods: {
    async create_y3dToken() {
      if (!utils.isAddress(this.tokenContract)) {
        alert('This is not a ethereum address, please double check your input.');
        return;
      }
      if (!utils.isAddress(this.yTokenContract)) {
        alert('This is not a ethereum address, please double check your input.');
        return;
      }
      this.deploying = true;
      const contract = y3dFactory.connect(getProvider().getSigner());
      try {
        const response = await contract.create(this.tokenContract, this.yTokenContract);
        console.log('tx response', response);

        // Wait for 1 confirmation
        const receipt = await response.wait(1);
        console.log('tx receipt', receipt);
        const CreateY3dTokenEvent = receipt.events[1];
        console.log('CreateY3dTokenEvent', CreateY3dTokenEvent);
        const hex64ToAddress = (hex) => `0x${hex.slice(26)}`;
        const y3dToken = hex64ToAddress(CreateY3dTokenEvent.data);
        this.deploying = false;
        this.deployedY3dToken = y3dToken;
        console.log('y3dToken address: ', y3dToken);
      } catch (error) {
        alert(error.message);
        this.deploying = false;
      }
    },
    goToY3dContract() {
      this.$router.push({
        name: 'Y3DToken',
        params: { contractAddress: this.deployedY3dToken },
      });
    },
  },
};
</script>

<style scoped>
input {
  width: 388px;
}
</style>
