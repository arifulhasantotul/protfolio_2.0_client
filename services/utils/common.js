export const validArray = (array = []) => {
  return Array.isArray(array) && array?.length > 0;
};
