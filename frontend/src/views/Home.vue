<template>
  <div class="home">
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
          <li v-for="pair in pairList" :key="pair.address">
            <router-link :to="`/y3d/${pair.address}`">
              {{pair.name}}
            </router-link>
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
/* eslint-disable no-alert */
export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    y3dContract: '',
    pairList: [
      { name: 'FUSDT/yFUSDT3d', address: '0x944f0639a04bd5204569ff28c8b385f73375e526' },
      { name: 'fy3d/yfy3d3d', address: '0x2e34f61ffa1605da4ee88a6d10e5d75ba8ce246b' },
      { name: 'SHUIHU/ySHUIHU3d', address: '0x1d8c0ef5639445faca65951423dec250bd0e68fc' },
    ],
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
