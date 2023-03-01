export const getFlexForOptions = (length: number, index: number) => {
  if (length === 1) return 1;
  if (length % 3 === 0) return 3;
  else if (length % 2 === 0) return 2;
  else if (length % 3 === 2) return index >= length - 2 ? 2 : 3;
  else return index >= length - 4 ? 2 : 3;
};
