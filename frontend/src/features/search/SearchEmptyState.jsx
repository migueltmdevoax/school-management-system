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
        No se encontraron resultados
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-gray-500
        "
      >
        Intenta buscar con otro termino
      </p>

    </div>

  );

};

export default
SearchEmptyState;