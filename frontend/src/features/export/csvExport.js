export const convertToCSV =
(data = []) => {

  if (!data.length) {

    return "";

  }




  const headers =
    Object.keys(data[0]);




  const rows =
    data.map((row) =>

      headers.map((header) => {

        const value =
          row[header];

        return `"${value ?? ""}"`;

      }).join(",")

    );




  return [

    headers.join(","),

    ...rows,

  ].join("\n");

};