export default function TableHeader({

  columns = [],
  onSort,
  sortKey,
  direction,

}) {

  return (

    <thead>

      <tr className="
        border-b
        border-gray-800
      ">

        {columns.map((column) => (

          <th

            key={column.key}

            onClick={() =>
              onSort(column.key)
            }

            className="
              text-left
              p-4
              text-gray-300
              cursor-pointer
              select-none
            "
          >

            {column.label}



            {sortKey === column.key && (

              <span className="
                ml-2
              ">

                {direction === "asc"
                  ? "↑"
                  : "↓"}

              </span>
            )}

          </th>
        ))}

      </tr>

    </thead>
  );
}