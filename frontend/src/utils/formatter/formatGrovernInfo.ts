const formatGrovernInfo = (value: string | number): string => {
  if (!value) return '--';
  return String(value);
};

export default formatGrovernInfo;

export {
  formatGrovernInfo,
};
