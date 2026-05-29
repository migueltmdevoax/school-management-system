import SearchResultItem
from "./SearchResultItem";

export default function SearchResults({

  results,

  onSelect,

}) {

  return (

    <div className="
      mt-6
      space-y-3
    ">

      {results.map(
        (student) => (

          <SearchResultItem

            key={student.id}

            student={student}

            onClick={() =>
              onSelect(student)
            }

          />

        )
      )}

    </div>

  );

}