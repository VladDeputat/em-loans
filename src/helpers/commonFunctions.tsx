export const addComas = (str: String) => {
  return str.split(/(?=(?:...)*$)/).join(',');
};
