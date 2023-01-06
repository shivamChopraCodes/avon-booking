export const dateToIndian = (dateString) => {
  if (!dateString) return '';
  const [year, month, date] = dateString.split('-');
  return `${new Date(dateString).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  })}`;
};
