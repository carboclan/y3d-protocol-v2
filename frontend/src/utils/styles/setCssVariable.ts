type ICSSVariable = [string, string]
type ICSSVariableConfig = Array<ICSSVariable>

const setCssVariable = (config: ICSSVariableConfig) => {
  const root = document.documentElement;
  config.forEach(([name, value]: ICSSVariable) => {
    root.style.setProperty(name, value);
  });
};

export {
  ICSSVariable,
  ICSSVariableConfig,
  setCssVariable,
};

export default setCssVariable;
