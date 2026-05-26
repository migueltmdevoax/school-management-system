export default function TablePagination({

  page,
  totalPages,
  onPageChange,

}) {

  return (

    <div className="
      flex
      items-center
      justify-end
      gap-2
      mt-6
    ">

      <button

        disabled={page === 1}

        onClick={() =>
          onPageChange(page - 1)
        }

        className="
          px-4
          py-2
          rounded-xl
          bg-gray-900
          border
          border-gray-800
          text-white
        "
      >
        ←
      </button>





      <span className="
        text-gray-400
      ">

        {page} / {totalPages}

      </span>





      <button

        disabled={
          page === totalPages
        }

        onClick={() =>
          onPageChange(page + 1)
        }

        className="
          px-4
          py-2
          rounded-xl
          bg-gray-900
          border
          border-gray-800
          text-white
        "
      >
        →
      </button>

    </div>
  );
}