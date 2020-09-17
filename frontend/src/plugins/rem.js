const baseSize = 16;
// 设置 rem 函数
function setRem() {
  const width = document.documentElement.clientWidth || document.body.clientWidth;
  const scale = width <= 375 ? width / 375 : 1;
  document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`;
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};
