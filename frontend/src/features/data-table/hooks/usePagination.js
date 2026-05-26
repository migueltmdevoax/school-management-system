import { useMemo } from "react";



export function usePagination(

  data = [],
  page = 1,
  limit = 10

) {

  return useMemo(() => {

    const start =
      (page - 1) * limit;

    const end =
      start + limit;



    return {

      total:
        data.length,

      totalPages:
        Math.ceil(
          data.length / limit
        ),

      paginatedData:
        data.slice(start, end),
    };

  }, [data, page, limit]);
}