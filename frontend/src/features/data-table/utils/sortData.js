export function sortData(

  data,
  sortKey,
  direction = "asc"

) {

  if (!sortKey) return data;



  return [...data].sort((a, b) => {

    const aValue = a[sortKey];
    const bValue = b[sortKey];



    if (aValue < bValue) {

      return direction === "asc"
        ? -1
        : 1;
    }



    if (aValue > bValue) {

      return direction === "asc"
        ? 1
        : -1;
    }



    return 0;
  });
}