import {
  useState,
  useMemo,
} from "react";

import TableHeader
from "./TableHeader";

import TablePagination
from "./TablePagination";

import TableToolbar
from "./TableToolbar";

import TableLoading
from "./TableLoading";

import TableEmpty
from "./TableEmpty";

import {
  useSorting,
} from "../hooks/useSorting";

import {
  useTableSearch,
} from "../hooks/useTableSearch";

import {
  usePagination,
} from "../hooks/usePagination";

import {
  sortData,
} from "../utils/sortData";

import {
  filterData,
} from "../utils/filterData";

import EmptyStudents
from "../../empty-states/components/EmptyStudents";

import EmptySearch
from "../../empty-states/components/EmptySearch";



export default function DataTable({

  data = [],
  columns = [],
  loading = false,
  searchFields = [],
  renderRow,

}) {

  const [

    page,
    setPage,

  ] = useState(1);



  const {

    sortKey,
    direction,
    handleSort,

  } = useSorting();




  const {

    search,
    setSearch,

  } = useTableSearch();





  // 🔥 FILTER
  const filteredData =
    useMemo(() => {

      return filterData(

        data,
        search,
        searchFields

      );

    }, [

      data,
      search,
      searchFields,

    ]);

    const hasSearch =

    search.trim().length > 0;





  // 🔥 SORT
  const sortedData =
    useMemo(() => {

      return sortData(

        filteredData,
        sortKey,
        direction

      );

    }, [

      filteredData,
      sortKey,
      direction,

    ]);





  // 🔥 PAGINATION
  const {

    paginatedData,
    totalPages,

  } = usePagination(

    sortedData,
    page,
    10

  );





  if (loading) {

    return <TableLoading />;
  }

if (!loading && data.length === 0) {

  return <EmptyStudents />;

}





if (
  !loading &&
  filteredData.length === 0
) {

  return <EmptySearch />;

}



  return (

    <div>

      {/* 🔥 TOOLBAR */}
      <TableToolbar

        search={search}

        setSearch={setSearch}
      />






      {/* 🔥 TABLE */}
      <div className="
        overflow-x-auto
        border
        border-gray-800
        rounded-2xl
      ">

        <table className="
          w-full
          bg-gray-950
        ">

          <TableHeader

            columns={columns}

            onSort={handleSort}

            sortKey={sortKey}

            direction={direction}
          />





          <tbody>

            {paginatedData.length === 0 && (

              <tr>

                <td
                  colSpan={
                    columns.length
                  }
                >

                  <TableEmpty />

                </td>

              </tr>
            )}






            {paginatedData.map(
              renderRow
            )}

          </tbody>

        </table>

      </div>






      {/* 🔥 PAGINATION */}
      <TablePagination

        page={page}

        totalPages={totalPages}

        onPageChange={setPage}
      />

    </div>
  );
}