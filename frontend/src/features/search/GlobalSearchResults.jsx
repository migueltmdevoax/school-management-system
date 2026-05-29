import SearchResultItem
from "./SearchResultItem";

const GlobalSearchResults = ({
  results,
}) => {

  if (!results)
    return null;

  return (

    <div className="space-y-6">

      {/* 🟣 STUDENTS */}

      <div>

        <p
          className="
            mb-2
            text-xs
            font-semibold
            uppercase
            text-gray-400
          "
        >
          Students
        </p>

        <div className="space-y-2">

          {results.students?.map(
            (student) => (

              <SearchResultItem

                key={student.id}

                item={student}

                type="Student"

              />

            )
          )}

        </div>

      </div>





      {/* 🟣 TEACHERS */}

      <div>

        <p
          className="
            mb-2
            text-xs
            font-semibold
            uppercase
            text-gray-400
          "
        >
          Teachers
        </p>

        <div className="space-y-2">

          {results.teachers?.map(
            (teacher) => (

              <SearchResultItem

                key={teacher.id}

                item={teacher}

                type="Teacher"

              />

            )
          )}

        </div>

      </div>

    </div>

  );

};

export default
GlobalSearchResults;