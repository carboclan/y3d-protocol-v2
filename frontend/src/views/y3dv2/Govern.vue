<template>
<LayoutY3DV2>
  <div class="govern">
    <div class="govern-container">
      <div>
        <span class="title-text">Select A y3dToken Address</span>
      </div>
      <div class="selection">
        <el-select v-model="value" placeholder="Token..." class="selection-container">
          <el-option
            class="option-select"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="blank-container">
      </div>
    </div>
  </div>
  </LayoutY3DV2>
</template>
<script lang="ts">
import Vue from 'vue';
import LayoutY3DV2 from '@/layouts/LayoutY3DV2.vue';

export default Vue.extend({
  components: {
    LayoutY3DV2,
  },
  data() {
    return {
      value: '',
      options: [
        {
          value: '1',
          label: 'yUNI-ETH-LPd',
        }, {
          value: '2',
          label: 'yUSD3d',
        }, {
          value: '3',
          label: 'yUSDTd',
        }, {
          value: '4',
          label: 'yDAI3d',
        }, {
          value: '5',
          label: 'yWBTC3d',
        },
      ],
    };
  },
});
</script>

<style scoped>
.govern-container {
  margin-top: 10px;
}

.title-text {
  font-size: 17px;
  margin-left: 5px;
}

.selection {
  margin-top: 16px;
}

.blank-container {
  height: 200px;
  width: 100%;
  border: 2px solid #777;
  border-radius: 15px;
  margin-top: 16px;
}

.el-select {
  width: 100%
}

/deep/ .el-select > .el-input > input {
  background-color: #333;
  border: 1px solid #111;
  outline: none;
  color: white;
}
</style>

<style>
.el-popper {
  background-color: #333 !important;
  border: 1px solid #111;
}

.el-select-dropdown__item:hover {
  background-color: #333;
  color: white;
}
</style>
