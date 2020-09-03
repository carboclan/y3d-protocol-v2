<template>
  <div class="home">
    <pre>
      y3d v2
    </pre>
    <div class="ui center aligned basic segment">
      <form class="ui form">
        <div class="field">
          <input v-model="y3dContract" type="text"
          placeholder="Enter Y3D Token Contract address..."  />
        </div>
        <button type="button" class="ui primary button" @click="goToY3dContract">Go</button>
      </form>
      <div class="ui horizontal divider">Or just choose one of them:</div>
      <div class="list-of">
        <ul>
          <li>
            <router-link to="/y3d/0x2e34f61ffa1605da4ee88a6d10e5d75ba8ce246b">fy3d/yfy3d3d</router-link>
          </li>
          <li>
            <router-link to="/y3d/0x1d8c0ef5639445faca65951423dec250bd0e68fc">SHUIHU/ySHUIHU3d</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- <h1 class="title">Please select one of them: </h1> -->
    
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
