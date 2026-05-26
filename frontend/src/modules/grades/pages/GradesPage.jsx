import {
  useState,
} from "react";

import GradeList
from "../components/GradeList";

import GradeForm
from "../components/GradeForm";

import {
  useAppSelector
} from "../../../hooks/useAppSelector";

import {
  hasPermission
} from "../../../utils/permissions";

import {
  useGetGradesQuery,
} from "../../../features/grades/api/gradesApi";

import {
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
} from "../../../features/grades/api/gradesApi";



export default function GradesPage() {

  const {
    user
  } = useAppSelector(
    (state) => state.auth
  );



  // 🔥 QUERY
  const {
    data: gradesResponse,
    isLoading: loading,
    error,
  } = useGetGradesQuery();



  const grades =
    gradesResponse?.data || [];



  // 🔥 MUTATIONS
  const [
    createGrade
  ] = useCreateGradeMutation();

  const [
    updateGrade
  ] = useUpdateGradeMutation();

  const [
    deleteGrade
  ] = useDeleteGradeMutation();



  // 🔥 UI STATE
  const [
    selectedGrade,
    setSelectedGrade
  ] = useState(null);




  // 🔥 SUBMIT
  const handleSubmit =
    async (data) => {

      try {

        if (selectedGrade) {

          await updateGrade({
            id: selectedGrade.id,
            data,
          }).unwrap();

        } else {

          await createGrade(
            data
          ).unwrap();
        }

        setSelectedGrade(null);

      } catch (err) {

        console.error(err);
      }
    };




  // 🔥 DELETE
  const handleDelete =
    async (id) => {

      try {

        await deleteGrade(id)
          .unwrap();

      } catch (err) {

        console.error(err);
      }
    };




  return (

    <div className="
      p-6
      space-y-6
    ">

      <div>

        <h1 className="
          text-3xl
          font-bold
          text-white
        ">
          📝 Grades
        </h1>

        <p className="
          text-gray-400
          mt-1
        ">
          Gestión académica
        </p>

      </div>



      {/* 🔥 FORM */}
      {

        hasPermission(
          user,
          "create:grades"
        ) && (

          <GradeForm
            onSubmit={
              handleSubmit
            }
            selectedGrade={
              selectedGrade
            }
          />

        )

      }



      {/* 🔄 LOADING */}
      {

        loading && (

          <p className="
            text-gray-400
          ">
            Loading grades...
          </p>

        )

      }



      {/* ❌ ERROR */}
      {

        error && (

          <p className="
            text-red-400
          ">
            Error loading grades
          </p>

        )

      }



      {/* 📭 EMPTY */}
      {

        !loading &&
        grades.length === 0 && (

          <p className="
            text-gray-400
          ">
            No grades yet
          </p>

        )

      }



      {/* ✅ DATA */}
      {

        !loading &&
        grades.length > 0 && (

          <GradeList

            grades={grades}

            onEdit={
              setSelectedGrade
            }

            onDelete={
              handleDelete
            }

          />

        )

      }

    </div>
  );
}