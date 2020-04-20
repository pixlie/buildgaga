export const transformData = (columns, row) => row.reduce((acc, cur, i) => ({
  ...acc,
  [columns[i]]: cur,
}), {});