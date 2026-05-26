import DataTable
from "../../../features/data-table/components/DataTable";

import StudentTableRow
from "../components/StudentTableRow";

import {
  useGetStudentsQuery,
} from "../studentsApi";



export default function StudentsPage() {

  const {

    data: students = [],

    isLoading,

  } = useGetStudentsQuery();





  // 🔥 TABLE COLUMNS
  const columns = [

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
  ];





  return (

    <div className="
      p-6
    ">

      <h1 className="
        text-3xl
        font-bold
        text-white
        mb-8
      ">

        👨‍🎓 Students

      </h1>






      <DataTable

        data={students}

        columns={columns}

        loading={isLoading}

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