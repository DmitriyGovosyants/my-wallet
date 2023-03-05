import { accountsIcons } from "data/accountsIcons"

export const getAccountIconSrc = (icon: string): string | undefined => {
  return accountsIcons.find(iconData => iconData.label === icon)?.src;
};