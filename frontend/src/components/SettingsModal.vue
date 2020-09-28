/* eslint-disable max-len */
<template>
  <Modal :shownHeader="false" v-model="dialogVisible" :customClass="customClass" :width="'420px'">
    <p class="settings-modal-title">
      {{ $t('app.settings') }}
    </p>
    <p class="settings-modal-tip">{{ $t('app.tipSettings') }}</p>
    <div class="settings-modal-choose-lang">
      <el-radio-group v-model="lang" @change="changLang">
        <el-radio-button label="ENGLISH"></el-radio-button>
        <el-radio-button label="中文"></el-radio-button>
      </el-radio-group>
    </div>
    <main-button plain class="settings-modal-cancel" @click="dialogVisible = false"
      >{{ $t('app.cancel').toUpperCase() }}</main-button
    >
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
      default: 'settings-modal',
    },
  },
  computed: {
    ...mapState('ethers', ['address']),
    ...mapState('lang', ['language']),
  },
  data() {
    return {
      dialogVisible: this.value,
      lang: '',
    };
  },
  watch: {
    language: {
      handler() {
        if (this.language === 'en') {
          this.lang = 'ENGLISH';
        } else {
          this.lang = '中文';
        }
      },
      immediate: true,
    },
    value(newVal) {
      this.dialogVisible = newVal;
    },
    dialogVisible(newVal) {
      this.$emit('input', newVal);
    },
  },
  methods: {
    changLang(v) {
      if (v === '中文') {
        this.$i18n.locale = 'zh-CN';
        this.$store.dispatch('lang/setLanguage', 'zh-CN');
      } else {
        this.$i18n.locale = 'en';
        this.$store.dispatch('lang/setLanguage', 'en');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .settings-modal {
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
  p {
    color: white;
  }
  &-title {
    color: #0091ff;
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 50px;
  }
  &-tip {
    font-size: 16px;
  }
  &-choose-lang {
    height: 40px;
    margin-bottom: 50px;
  }
  &-cancel {
    border-radius: 16px;
  }
}
</style>
