<template>
  <div class="about-menu" @click.stop="">
    <a target="_blank" href="https://y3d.finance/" class="text-link">
      <img src="@/assets/menu/switch.png" class="icon-link" />
      <p>Old Version</p>
    </a>
    <a target="_blank" href="https://shimo.im/docs/PcWhYR9gqHH6dxGX/read" class="text-link">
      <img src="@/assets/menu/doc.png" class="icon-link" />
      <p>Docs</p>
    </a>
    <a target="_blank" href="https://github.com/carboclan/y3d-protocol-v2" class="text-link">
      <img src="@/assets/menu/github.png" class="icon-link" />
      <p>Github</p>
    </a>
    <a target="_blank" href="https://t.me/y3dScam" class="text-link">
      <img src="@/assets/menu/telegram.png" class="icon-link" />
      <p>Telegram</p>
    </a>
    <a target="_blank" href="https://discord.gg/PEBhUf" class="text-link">
      <img src="@/assets/menu/discord.png" class="icon-link" />
      <p>Discord</p>
    </a>
  </div>
</template>

<script>

export default {
  components: {
  },
};
</script>

<style lang="scss" scoped>
.about-menu {
  min-width: 8.125rem;
  background-color: rgb(64, 68, 79);
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
    rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
  border-radius: 0.5rem;
  padding: 10px 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 16px;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;
}

.text-link {
  white-space: nowrap;
  margin-top: 6px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  img {
    height: 16px;
    width: 20px;
    object-fit: contain;
  }
  img:child-of-type(-1) {
    height: 14px;
  }
}
.text-link:hover {
  opacity: 0.8;
}

.icon-link {
  margin-right: 9px;
}
</style>
