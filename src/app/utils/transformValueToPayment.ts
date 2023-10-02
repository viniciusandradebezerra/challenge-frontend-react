export const transformValueToPayment = (value: string) => {

  const hasPoint = value.includes(".");

  value = value.replace(/\./g, "");

  value = hasPoint 
  ? value : value + "00";

  return value;
};
