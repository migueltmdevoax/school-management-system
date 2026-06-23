export function filterData(data, search, fields = []) {
  if (!search) return data;
  return data.filter((item) =>
    fields.some((f) => String(item[f] || "").toLowerCase().includes(search.toLowerCase()))
  );
}