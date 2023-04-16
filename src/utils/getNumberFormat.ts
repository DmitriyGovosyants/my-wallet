export const getNumberFormat = (num: string) => {
  let numberParts = num.split('.');

  numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return numberParts.join('.');
}