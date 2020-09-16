/* eslint-disable max-len */
<template>
  <Modal :shownHeader="false" v-model="dialogVisible" :customClass="customClass" :width="'420px'">
    <p class="c-wallet-modal-title">
      {{ connected ? 'My Account' : 'Selected a waller provider' }}
    </p>
    <div class="c-wallet-modal-my-account" v-if="connected">
      <img src="@/assets/base/lightsword.png" />
      <p>{{ address }}</p>
    </div>
    <div class="c-wallet-modal-select-wallet" v-else>
      <div class="c-wallet-modal-select-wallet-item">
        <img src="@/assets/base/metamask.png" />
        <p class="wallet-name">Metamask</p>
      </div>
    </div>
    <div class="c-wallet-modal-footer" v-if="connected">
      <main-button plain class="c-wallet-modal-cancel" @click="clickOnDisconnect"
        >SIGN OUT</main-button
      >
      <main-button plain class="c-wallet-modal-cancel" @click="dialogVisible = false"
        >CANCEL</main-button
      >
    </div>
    <div class="c-wallet-modal-footer" v-else>
      <main-button plain class="c-wallet-modal-cancel" @click="clickOnConnect">CONNECT</main-button>
      <main-button plain class="c-wallet-modal-cancel" @click="dialogVisible = false"
        >CANCEL</main-button
      >
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'vuex';
import Modal from './Modal.vue';
import MainButton from './MainButton.vue';

export default {
  components: {
    Modal,
    MainButton,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: 'c-wallet-modal',
    },
  },
  computed: {
    ...mapState('ethers', ['connected', 'address']),
  },
  data() {
    return {
      dialogVisible: this.value,
      lang: 'ENGLISH',
    };
  },
  watch: {
    value(newVal) {
      this.dialogVisible = newVal;
    },
    dialogVisible(newVal) {
      this.$emit('input', newVal);
    },
  },
  methods: {
    clickOnConnect() {
      this.dialogVisible = false;
      this.$store.dispatch('ethers/connect');
    },
    clickOnDisconnect() {
      this.dialogVisible = false;
      setTimeout(() => {
        this.$store.dispatch('ethers/disconnect');
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .c-wallet-modal {
  transform: translate(0%, -50%);
  top: 50%;
  margin-top: unset !important;
  padding: 24px;

  .c-model-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &-my-account,
  &-select-wallet-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 128px;
    }
    p {
      font-size: 16px;
      margin: 20px 20px 50px 20px;
    }
    .wallet-name {
      font-size: 24px;
    }
  }
  &-title {
    color: #0091ff;
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 70px;
  }
  &-tip {
    font-size: 16px;
  }
  &-choose-lang {
    height: 40px;
    margin-bottom: 50px;
  }
  &-footer {
    width: 100%;
    .c-main-button-text {
      font-size: 24px;
    }
    &-cancel {
      border-radius: 16px;
    }
    .c-main-button {
      margin-bottom: 24px;
    }
    .c-main-button:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
</style>
