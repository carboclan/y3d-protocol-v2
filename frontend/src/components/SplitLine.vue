<template>
  <div class="split">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.split {
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
}
</style>
