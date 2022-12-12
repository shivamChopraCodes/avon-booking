export const dateToIndian = (dateString) => {
  if (!dateString) return '';
  const [year, month, date] = dateString.split('-');
  return `${date}/${month}/${year}`;
};
