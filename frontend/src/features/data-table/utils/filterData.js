export function filterData(

  data,
  search,
  fields = []

) {

  if (!search) return data;



  return data.filter((item) =>

    fields.some((field) =>

      String(item[field] || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )
  );
}