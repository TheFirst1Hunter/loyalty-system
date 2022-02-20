export const getDaysInBetween = (a: Date, b: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const incrementDate = (date: Date, value: number) => {
  date.setDate(date.getDate() + value);

  return formatDate(date);
};

export const getDate = (date: string) => {
  const day = date.split('-')[2].split('T')[0];
  const month = date.split('-')[1]
  const year = date.split('-')[0]

  console.debug(date);
  return { day, month, year };
}
