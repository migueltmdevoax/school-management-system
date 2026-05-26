import TableSearch
from "./TableSearch";



export default function TableToolbar({

  search,
  setSearch,

}) {

  return (

    <div className="
      flex
      items-center
      justify-between
      mb-6
    ">

      <TableSearch

        value={search}

        onChange={setSearch}
      />

    </div>
  );
}