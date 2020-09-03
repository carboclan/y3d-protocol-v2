<template>
  <div class="create">
    <h1 class="title">Create A y3d Token</h1>
    <form class="ui form">
      <div class="field">
        <label>Underlying Token</label>
        <input type="text" placeholder="Enter Token Contract address..." v-model="tokenContract" />
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
  }),
  computed: {},
  methods: {
    async create_y3dToken() {
      if (!utils.isAddress(this.tokenContract)) {
        alert('This is not a ethereum address, please double check your input.');
        return;
      }
      const contract = y3dFactory.connect(getProvider().getSigner());
      const response = await contract.create(this.tokenContract);
      console.log('tx response', response);

      // Wait for 1 confirmation
      const receipt = await response.wait(1);
      console.log('tx receipt', receipt);
    },
  },
};
</script>

<style scoped>
input {
  width: 388px;
}
</style>
