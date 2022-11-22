export const dateToIndian = (dateString) => {
  const [year, month, date] = dateString.split('-');
  return `${date}/${month}/${year}`;
};
