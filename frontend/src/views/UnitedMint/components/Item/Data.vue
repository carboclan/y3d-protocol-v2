<template>
  <div class="united-mint-data">
    <div class="united-mint-data-wrap">
      <div class="united-mint-data-wrap-info mr24">
        <p>Contract Data</p>
        <div class="united-mint-data-wrap-info-detail">
          <p>Unminted USDT: <span>{{ contractData.unmintedUSDT }}</span></p>
          <p>Minted USDT: <span>{{ contractData.mintedUSDT }}</span></p>
          <p>Minted {{ data.key }}: <span>{{ contractData.mintedToken }}</span></p>
        </div>
      </div>
      <div class="united-mint-data-wrap-info">
        <p>Your Data</p>
        <div class="united-mint-data-wrap-info-detail">
          <p>Unminted USDT: <span>{{ yourData.unmintedUSDT }}</span></p>
          <p>Unclaimed {{ data.key }}: <span>{{ yourData.unclaimedToken }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnitedMintItemData',
  data() {
    return {};
  },
  props: {
    contractData: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => null,
    },
    yourData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {},
  computed: {},
  methods: {},
  watch: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/color.scss";
@media (max-width: 600px) {
  .united-mint-data {
    &-wrap {
      padding: 0 0px !important;
      .mr24 {
        margin-right: unset !important;
      }
      flex-direction: column;
      &-info {
        width: 100%;
      }
      &-info:nth-of-type(1) {
        margin-bottom: 20px;
      }
    }
  }
}
.united-mint-data {
  &-wrap {
    margin-top: 24px;
    padding: 0 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mr24 {
      margin-right: 24px;
    }
    &-info {
      flex-grow: 1;
      p {
        font-size: 14px;
        margin: 0 0 8px 0;
        height: 20px;
        span {
          font-weight: bold;
          color: $um-text;
        }
      }
      &-detail {
        border-radius: 4px;
        background-color: white;
        width: 100%;
        min-height: 122px;
        border: 1px solid $um-text;
        padding: 8px 16px;
        p {
          color: #777777;
          font-size: 16px;
          margin: 0 0 8px 0;
        }
      }
    }
  }
}
</style>
