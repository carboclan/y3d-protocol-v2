<template>
  <el-dialog
    :visible.sync="modelVisible"
    :width="width"
    :custom-class="'c-model ' + customClass"
    :modal-append-to-body='false'
  >
    <div class="c-model-container">
      <div class="c-model-header" v-if="shownHeader">
        <div class="c-model-header-content">
          <slot name="header"></slot>
        </div>
        <div class="c-model-close" @click="modelVisible = false">
          <x-icon class="c-model-close-icon" />
        </div>
      </div>
      <div class="c-model-body">
        <slot></slot>
      </div>
      <div class="c-model-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Modal',
  props: {
    shownHeader: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '420px',
    },
  },
  data() {
    return {
      modelVisible: this.value,
    };
  },
  watch: {
    value(newVal) {
      this.modelVisible = newVal;
    },
    modelVisible(newVal) {
      this.$emit('input', newVal);
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .c-model {
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  align-self: center;
  outline: none;
  border: 1px solid rgb(33, 36, 41);
  border-radius: 20px;
  background-color: rgb(33, 36, 41);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px 0px;
  padding: 0px;
  // width: 420px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    width: 100%;
    padding: 0;
    color: inherit;
    font-size: inherit;
  }
}
.c-model-container {
  display: flex;
  flex-flow: column nowrap;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.c-model-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-weight: 500;
  color: inherit;
  &-content {
    display: flex;
    align-items: center;
  }
}
.c-model-close {
  width: 24px;
  height: 24px;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  &-icon {
    width: 24px;
    height: 24px;
  }
}
.c-model-body {
  display: block;
}
.c-model-footer {
  display: block;
  padding-bottom: 1rem;
}
</style>
