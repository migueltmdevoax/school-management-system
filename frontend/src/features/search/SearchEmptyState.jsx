const SearchEmptyState = () => {

  return (

    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-16
        text-center
      "
    >

      <h3
        className="
          text-lg
          font-semibold
        "
      >
        No results found
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-gray-500
        "
      >
        Try another search term
      </p>

    </div>

  );

};

export default
SearchEmptyState;