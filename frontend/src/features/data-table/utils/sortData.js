export function sortData(data, sortKey, direction = "asc") {
  if (!sortKey) return data;
  return [...data].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (av < bv) return direction === "asc" ? -1 : 1;
    if (av > bv) return direction === "asc" ?  1 : -1;
    return 0;
  });
}