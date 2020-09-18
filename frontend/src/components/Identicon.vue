<template>
  <div class="id-icon" ref="identiconElement"></div>
</template>
<style lang="scss" scoped>
.id-icon {
  border-radius: 50px;
  overflow: hidden;
  padding: 0px;
  margin: 0px;
  width: 16px;
  height: 16px;
  display: inline-block;
}
</style>
<script lang="ts">
import Vue from 'vue';
/* @ts-ignore */
import Jazzicon from '@metamask/jazzicon';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Identicon',
  computed: {
    ...mapState('ethers', ['address']),
  },
  mounted() {
    const iconEle = Jazzicon(16, parseInt(this.address.slice(2, 10), 16));
    const element = this.$refs.identiconElement as HTMLDivElement;
    element.appendChild(iconEle);
  },
});
</script>
