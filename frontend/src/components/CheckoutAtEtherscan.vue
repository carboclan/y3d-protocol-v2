<template>
    <a :href="link" rel="noopener"
      target="_blank" class="ui bottom attached button">
        <i class="external alternate icon"></i>
        Etherscan
    </a>
</template>

<script>
import { mapState } from 'vuex';
import { getChainId } from '../store/ethers/ethersConnect';

export default {
  name: 'CheckoutAtEtherscan',
  props: {
    contract: String,
  },
  computed: {
    ...mapState(['network']),
    getPrefix() {
      const chainId = getChainId();
      switch (chainId) {
        case '0x1': // mainnet
          return 'www';
        case '0x3': // Ropsten
          return 'ropsten';
        case '0x4': // Rinkeby
          return 'rinkeby';
        case '0x5': // Goerli
          return 'goerli';
        case '0x2a': // Kovan
          return 'kovan';
        case undefined:
        case null:
          return 'No Chain!';
          // if you give your ganache an id your can detect it here if you want
        default:
          return 'Unknown';
      }
    },
    link() {
      return `https://${this.getPrefix}.etherscan.io/address/${this.contract}`;
    },
  },
};
</script>
