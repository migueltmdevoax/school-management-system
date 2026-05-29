import DataTable
from "../../../features/data-table/components/DataTable";

import StudentTableRow
from "../components/StudentTableRow";

import {
  useGetStudentsQuery,
} from "../studentsApi";

import BulkActionsBar
from "../../../features/bulk-actions/BulkActionsBar";

import EmptyState
from "../../../components/feedback/EmptyState";

import SkeletonTable
from "../../../components/feedback/SkeletonTable";

import {
  useState,
} from "react";

import FilterBar
from "../../../features/filters/components/FilterBar";

import useStudentFilters
from "../../../features/filters/useStudentFilters";

export default function StudentsPage() {

  const {

    data: students = [],

    isLoading,

  } = useGetStudentsQuery();




  /*
  |--------------------------------------------------------------------------
  | 🟣 TABLE COLUMNS
  |--------------------------------------------------------------------------
  */

  const columns = [

    {
      key: "select",
      label: "",
    },

    {
      key: "first_name",
      label: "Nombre",
    },

    {
      key: "last_name",
      label: "Apellido",
    },

    {
      key: "email",
      label: "Email",
    },

    {
      key: "actions",
      label: "Acciones",
    },

    {
  key: "risk",
  label: "Risk",
},

{
  key: "health",
  label: "Health",
},

{
  key: "sync",
  label: "Sync",
},

  ];

  if (isLoading) {

  return (

    <div className="p-6">

      <SkeletonTable />

    </div>

  );

}





if (!students.length) {

  return (

    <div className="p-6">

      <EmptyState

        icon="👨‍🎓"

        title="No students yet"

        description="
          Students will appear here
          once created.
        "

      />

    </div>

  );

}

const [

  filter,

  setFilter,

] = useState("all");





const filteredStudents =
  useStudentFilters({

    students,

    filter,

  });



  return (

    <div className="p-6">

      <h1
        className="
          mb-8
          text-3xl
          font-bold
          text-white
        "
      >

        👨‍🎓 Students

      </h1>




      {/* 🔥 BULK ACTIONS */}
      <BulkActionsBar />


      <FilterBar

  filter={filter}

  setFilter={setFilter}

/>


      <DataTable

        data={filteredStudents}

        columns={columns}

        loading={false}

        searchFields={[

          "first_name",
          "last_name",
          "email",

        ]}

        renderRow={(student) => (

          <StudentTableRow

            key={student.id}

            student={student}

          />

        )}

      />

    </div>

  );

}