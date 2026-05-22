import { useState } from "react";

// ✅ Query desde meApi (ownership-aware)
import {
  useGetMyStudentsQuery,
} from "../../../features/me/meApi";

// ✅ Mutations se quedan donde ya existían
import {
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "../../../features/students/studentsApi";

import StudentForm from "../components/StudentForm";
import StudentCardPro from "../components/StudentCardPro";
import Button from "../../../components/ui/Button";
import { useToast } from "../../../context/ToastContext";

export default function StudentsPage() {
  const { showToast } = useToast();

  // 🟣 RTK QUERY
  const {
    data: studentsResponse,
    isLoading: loading,
    error,
  } = useGetMyStudentsQuery();

  const students = studentsResponse?.data || [];

  // 🟣 MUTATIONS
  const [addStudent] = useAddStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  // 🟣 UI STATE
  const [showForm, setShowForm] = useState(false);

  // 🟣 CREATE STUDENT
  const handleCreateStudent = async (data) => {
    try {
      showToast("⏳ Creando alumno...", "loading");
      await addStudent(data).unwrap();
      showToast("✅ Alumno creado", "success");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      showToast("❌ Error creando alumno", "error");
    }
  };

  // 🟣 DELETE STUDENT
  const handleDeleteStudent = async (id) => {
    try {
      showToast("⏳ Eliminando alumno...", "loading");
      await deleteStudent(id).unwrap();
      showToast("✅ Alumno eliminado", "success");
    } catch (err) {
      console.error(err);
      showToast("❌ Error eliminando alumno", "error");
    }
  };

  // 🟣 UPDATE STUDENT
  const handleUpdateStudent = async (id, data) => {
    try {
      showToast("⏳ Actualizando alumno...", "loading");
      await updateStudent({ id, data }).unwrap();
      showToast("✅ Alumno actualizado", "success");
    } catch (err) {
      console.error(err);
      showToast("❌ Error actualizando alumno", "error");
    }
  };

  return (
    <div className="p-6">
      {/* 🟣 HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">🎓 Centro Estudiantil</h1>
          <p className="text-gray-400 mt-1">Gestión inteligente de alumnos</p>
        </div>
        <Button variant="ghost" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cerrar" : "➕ Nuevo Alumno"}
        </Button>
      </div>

      {/* 🟣 FORM */}
      {showForm && (
        <div className="mb-8">
          <StudentForm
            onSubmit={handleCreateStudent}
            onClose={() => setShowForm(false)}
            existingStudents={students}
          />
        </div>
      )}

      {/* 🟣 LOADING */}
      {loading && (
        <div className="text-center text-gray-400 py-10">Cargando alumnos...</div>
      )}

      {/* 🟣 ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6">
          Error cargando alumnos
        </div>
      )}

      {/* 🟣 EMPTY */}
      {!loading && students.length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center text-gray-400">
          <h2 className="text-xl mb-2">No hay alumnos todavía</h2>
          <p>Agrega el primer alumno al sistema</p>
        </div>
      )}

      {/* 🟣 STUDENTS GRID */}
      {!loading && students.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCardPro
              key={student.id}
              student={student}
              onDelete={handleDeleteStudent}
              onEdit={handleUpdateStudent}
            />
          ))}
        </div>
      )}
    </div>
  );
}