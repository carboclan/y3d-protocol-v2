<template>
  <el-tooltip popper-class="tooltip-box" effect="dark" :content="content" :placement="placement">
    <div class="help-box">
      <HelpCircleIcon class="help-icon"></HelpCircleIcon>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    placement: {
      type: String,
      default: 'top',
    },
    content: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.help-box {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none rgb(44, 47, 54);
  outline: none;
  cursor: default;
  border-radius: 36px;
  color: rgb(195, 197, 203);
  width: 28px;
  height: 28px;
  margin: 0 0 0 4px;

  &:hover,
  &:focus {
    opacity: 0.7;
  }
}
.help-icon {
  width: 28px;
  height: 28px;
  font-size: 16px;
}
</style>

<style lang="scss">
.tooltip-box {
  max-width: 230px;
  z-index: 9999;
  transition: visibility 150ms linear 0s, opacity 150ms linear 0s;
  background: rgb(44, 47, 54) !important;
  border: 1px solid rgb(64, 68, 79);
  color: rgb(195, 197, 203) !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px 0px;
  border-radius: 8px;

  padding: 0.6rem 1rem;
  line-height: 150%;
  font-weight: 400;

  box-sizing: border-box;
  font-size: 16px;
}
</style>
