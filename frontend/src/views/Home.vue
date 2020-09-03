<template>
  <div class="home">
    <pre>
      y3d v2
    </pre>
    <!-- <h1 class="title">Please select one of them: </h1> -->
    <form class="ui form">
      <div class="field">
        <input v-model="y3dContract" type="text"
        placeholder="Enter Y3D Token Contract address..."  />
      </div>
      <button type="button" class="ui primary button" @click="goToY3dContract">Go</button>
    </form>
  </div>
</template>

<script>
import { utils } from '../store/ethers/ethersConnect';

// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    y3dContract: '',
  }),
  methods: {
    goToY3dContract() {
      if (!utils.isAddress(this.y3dContract)) {
        alert('This is not a ethereum address, please double check your input.');
        return;
      }
      this.$router.push({
        name: 'Y3DToken',
        params: { contractAddress: this.y3dContract },
      });
    },
  },
};
</script>
