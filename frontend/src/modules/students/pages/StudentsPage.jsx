import { useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "../../../features/data-table/components/DataTable";
import StudentTableRow from "../components/StudentTableRow";
import { useGetStudentsQuery } from "../../../features/students/studentsApi";
import BulkActionsBar from "../../../features/bulk-actions/BulkActionsBar";
import SkeletonTable from "../../../components/feedback/SkeletonTable";
import FilterBar from "../../../features/filters/components/FilterBar";
import useStudentFilters from "../../../features/filters/useStudentFilters";
import { openModal } from "../../../features/modal/modalSlice";

export default function StudentsPage() {
  const dispatch = useDispatch();
  const { data: students = [], isLoading } = useGetStudentsQuery();
  const [filter, setFilter] = useState("all");

  const filteredStudents = useStudentFilters({ students, filter });

  const columns = [
    { key: "select",     label: "" },
    { key: "first_name", label: "Nombre" },
    { key: "last_name",  label: "Apellido" },
    { key: "group",       label: "Group" },
    { key: "email",      label: "Email" },
    { key: "risk",       label: "Risk" },
    { key: "health",     label: "Health" },
    { key: "sync",       label: "Sync" },
    { key: "actions",    label: "Acciones" },
  ];

  if (isLoading) {
    return <div className="p-6"><SkeletonTable /></div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">👨‍🎓 Students</h1>
          <p className="text-gray-400 mt-1">School management</p>
        </div>
        <button
          onClick={() => dispatch(openModal({ modalType: "createStudent" }))}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all"
        >
          + New Student
        </button>
      </div>

      <BulkActionsBar />
      <FilterBar filter={filter} setFilter={setFilter} />

      <DataTable
        data={filteredStudents}
        columns={columns}
        loading={false}
        searchFields={["first_name", "last_name", "email"]}
        renderRow={(student) => (
          <StudentTableRow key={student.id} student={student} />
        )}
      />
    </div>
  );
}