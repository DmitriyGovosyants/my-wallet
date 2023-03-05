import { currencyData } from "data/currencyData";

export const getCurrencyLabel = (currency: string): string | undefined => {
  return currencyData.find(itm => itm.value === currency)?.label;
};