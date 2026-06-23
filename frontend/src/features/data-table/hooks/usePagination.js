import { useMemo } from "react";

export function usePagination(data = [], page = 1, limit = 10) {
  return useMemo(() => {
    const start = (page - 1) * limit;
    return {
      total:         data.length,
      totalPages:    Math.max(1, Math.ceil(data.length / limit)),
      paginatedData: data.slice(start, start + limit),
    };
  }, [data, page, limit]);
}