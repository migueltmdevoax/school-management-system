import useBulkSelection
from "./useBulkSelection";

import {
  useBulkDeleteStudentsMutation,
  useGetStudentsQuery,
} from "../../features/students/studentsApi";

import {
  exportStudents,
} from "../export/exportStudents";

const BulkActionsBar = () => {

  const {

    selectedIds,

    clear,

  } =
    useBulkSelection();




  const {

    data: students = [],

  } =
    useGetStudentsQuery();




  const [

    bulkDeleteStudents,

    {

      isLoading,

    },

  ] =
    useBulkDeleteStudentsMutation();




  /*
  |--------------------------------------------------------------------------
  | 🟣 SELECTED STUDENTS
  |--------------------------------------------------------------------------
  */

  const selectedStudents =
    students.filter(

      (student) =>

        selectedIds.includes(
          student.id
        )

    );




  /*
  |--------------------------------------------------------------------------
  | 🟣 EXPORT
  |--------------------------------------------------------------------------
  */

  const handleExport =
    () => {

      exportStudents(
        selectedStudents
      );

    };




  /*
  |--------------------------------------------------------------------------
  | 🟣 BULK DELETE
  |--------------------------------------------------------------------------
  */

  const handleBulkDelete =
    async () => {

      if (
        !selectedIds.length
      ) {

        return;

      }




      try {

        await bulkDeleteStudents(

          selectedIds

        ).unwrap();




        clear();

      } catch (error) {

        console.error(error);

      }

    };




  if (
    selectedIds.length === 0
  ) {

    return null;

  }




  return (

    <div
      className="
        sticky
        top-0
        z-40
        mb-4
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-gray-800
        bg-gray-900
        p-4
      "
    >

      <div>

        <p
          className="
            text-sm
            font-medium
            text-white
          "
        >

          {selectedIds.length}
          {" "}
          selected

        </p>

      </div>





      <div
        className="
          flex
          items-center
          gap-2
        "
      >

        <button

          onClick={
            handleExport
          }

          className="
            rounded-xl
            border
            border-gray-700
            px-4
            py-2
            text-sm
            text-white
            hover:bg-gray-800
          "
        >

          Export CSV

        </button>





        <button
          className="
            rounded-xl
            border
            border-gray-700
            px-4
            py-2
            text-sm
            text-white
            hover:bg-gray-800
          "
        >
          Notify
        </button>





        <button

          onClick={
            handleBulkDelete
          }

          disabled={
            isLoading
          }

          className="
            rounded-xl
            bg-red-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            hover:bg-red-500
            disabled:opacity-50
          "
        >

          {

            isLoading
              ? "Deleting..."
              : "Delete"

          }

        </button>





        <button

          onClick={clear}

          className="
            rounded-xl
            border
            border-gray-700
            px-4
            py-2
            text-sm
            text-white
            hover:bg-gray-800
          "
        >
          Clear
        </button>

      </div>

    </div>

  );

};

export default
BulkActionsBar;