import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  closeSearch,
  setSearchQuery,
} from "../searchSlice";

import {
  useGetStudentsQuery,
} from "../../students/studentsApi";

import {
  openSlideOver,
} from "../../slide-over/slideOverSlice";

import useGlobalSearch
from "../useGlobalSearch";

import SearchInput
from "./SearchInput";

import SearchResults
from "./SearchResults";

export default function GlobalSearchModal() {

  const dispatch =
    useDispatch();





  const {

    isOpen,

    query,

  } = useSelector(
    (state) => state.search
  );





  const {

    data: students = [],

  } = useGetStudentsQuery();





  const results =
    useGlobalSearch({

      query,

      students,

    });





  if (!isOpen)
    return null;





  return (

    <div className="
      fixed
      inset-0
      z-[300]
      flex
      items-start
      justify-center
      bg-black/60
      p-6
      backdrop-blur-sm
    ">

      <div className="
        mt-20
        w-full
        max-w-2xl
        rounded-3xl
        border
        border-gray-800
        bg-gray-950
        p-6
        shadow-2xl
      ">

        <SearchInput

          value={query}

          onChange={(e) =>

            dispatch(
              setSearchQuery(
                e.target.value
              )
            )

          }

        />





        <SearchResults

          results={results}

          onSelect={(student) => {

            dispatch(
              closeSearch()
            );



            dispatch(

              openSlideOver({

                component:
                  "STUDENT_PROFILE",

                entityId:
                  student.id,

              })

            );

          }}

        />

      </div>

    </div>

  );

}