<template>
  <div class="united-mint-wrap">
    <united-mint-item
      v-for="(data, index) of mintData"
      :key="index"
      :opened="data.opened"
      :data="data"
      @itemToggle="toggleItem"
    />
  </div>
</template>

<script>
import UnitedMintItem from './components/Item.vue';

export default {
  name: 'UnitedMintView',
  data() {
    return {
      mintData: [
        { key: 'yYCrv', opened: true },
      ],
    };
  },
  components: {
    UnitedMintItem,
  },
  computed: {},
  methods: {
    toggleItem(data) {
      for (let i = 0; i < this.mintData.length; i += 1) {
        if (this.mintData[i].key === data.key) {
          this.mintData[i].opened = !this.mintData[i].opened;
        }
      }
    },
  },
  watch: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.united-mint-wrap {
  margin: 0 20px;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  align-items: center;
}
</style>
