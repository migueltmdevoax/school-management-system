import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useGetStudentsQuery,
} from "../../students/studentsApi";

import {
  globalSearchData,
} from "../globalSearchData";

import useGlobalSearch
from "../useGlobalSearch";

import GlobalSearchItem
from "./GlobalSearchItem";

export default function
GlobalSearchModal({

  onClose,

}) {

  const navigate =
    useNavigate();

  const [

    query,

    setQuery,

  ] = useState("");





  const {

    data: students = [],

  } = useGetStudentsQuery();





  const items =
    globalSearchData(
      students
    );





  const results =
    useGlobalSearch({

      items,

      query,

    });





  const handleSelect =
    (item) => {

      navigate(
        item.path
      );

      onClose();

    };





  return (

    <div className="
      fixed
      inset-0
      z-[9999]
      flex
      items-start
      justify-center
      bg-black/60
      p-8
      backdrop-blur-sm
    ">

      <div className="
        w-full
        max-w-2xl
        rounded-3xl
        border
        border-gray-800
        bg-gray-900
        shadow-2xl
      ">

        {/* SEARCH */}
        <div className="
          border-b
          border-gray-800
          p-4
        ">

          <input

            autoFocus

            value={query}

            onChange={(e) =>
              setQuery(
                e.target.value
              )
            }

            placeholder="
              Search anything...
            "

            className="
              w-full
              bg-transparent
              text-lg
              text-white
              outline-none
              placeholder:text-gray-500
            "
          />

        </div>





        {/* RESULTS */}
        <div className="
          max-h-[500px]
          overflow-y-auto
          p-2
        ">

          {results.map(
            (item) => (

              <GlobalSearchItem

                key={item.id}

                item={item}

                onClick={
                  handleSelect
                }

              />

            )
          )}

        </div>

      </div>

    </div>

  );

}