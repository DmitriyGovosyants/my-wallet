export interface IICon {
  src: string;
  label: string;
};

export const getIconSrc = (icon: string, icons: IICon[]): string | undefined => {
  return icons.find(iconData => iconData.label === icon)?.src;
};