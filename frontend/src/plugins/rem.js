const baseSize = 16;
// 设置 rem 函数
function setRem() {
  const width = document.documentElement.clientWidth || document.body.clientWidth;
  console.log(`width: ${width}`);
  const scale = width <= 375 ? width / 375 : 1;
  console.log(`scale: ${scale}`);
  document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`;
  console.log(`fontSize: ${baseSize * Math.min(scale, 2)}`);
  console.log(document.documentElement.style.fontSize);
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};
