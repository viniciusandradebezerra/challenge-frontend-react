export const transformValueToPayment = (value: string) => {
  value = value.replace(/\./g, "");

  value = value + "0";

  return value;
};
