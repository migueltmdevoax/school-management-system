import { useState, useMemo } from "react";
import TableHeader     from "./TableHeader";
import TablePagination from "./TablePagination";
import TableToolbar    from "./TableToolbar";
import TableLoading    from "./TableLoading";
import TableEmpty      from "./TableEmpty";
import { useSorting }     from "../hooks/useSorting";
import { useTableSearch } from "../hooks/useTableSearch";
import { usePagination }  from "../hooks/usePagination";
import { sortData }   from "../utils/sortData";
import { filterData } from "../utils/filterData";

export default function DataTable({ data = [], columns = [], loading = false, searchFields = [], renderRow }) {
  const [page, setPage] = useState(1);
  const { sortKey, direction, handleSort } = useSorting();
  const { search, setSearch } = useTableSearch();

  const filteredData = useMemo(() => filterData(data, search, searchFields), [data, search, searchFields]);
  const sortedData   = useMemo(() => sortData(filteredData, sortKey, direction), [filteredData, sortKey, direction]);
  const { paginatedData, totalPages } = usePagination(sortedData, page, 10);

  if (loading) return <TableLoading />;
  if (!loading && data.length === 0) return <TableEmpty message="No students found" />;
  if (!loading && filteredData.length === 0) return <TableEmpty message="No results for your search" />;

  return (
    <div>
      <TableToolbar search={search} setSearch={setSearch} />
      <div className="overflow-x-auto border border-gray-800 rounded-2xl">
        <table className="w-full bg-gray-950">
          <TableHeader columns={columns} onSort={handleSort} sortKey={sortKey} direction={direction} />
          <tbody>{paginatedData.map(renderRow)}</tbody>
        </table>
      </div>
      <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}