export const formatString = (str, ...values) => {
    return str.replace(/{(\d+)}/g, (match, index) => values[index]);
  }