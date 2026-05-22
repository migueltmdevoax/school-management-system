import {
  useEffect,
  useState,
} from "react";

import GradeList
from "../components/GradeList";

import GradeForm
from "../components/GradeForm";

import {
  useAuth
} from "../../../context/AuthContext";

import {
  hasPermission
} from "../../../utils/permissions";

import {
  useGrades
} from "../hooks/useGrades";



export default function GradesPage() {

  const {
    user
  } = useAuth();



  // 🔥 CUSTOM HOOK
  const {

    grades,
    loading,
    error,

    fetchGrades,

    createGrade,
    updateGrade,
    deleteGrade,

  } = useGrades();



  // 🔥 UI STATE
  const [
    selectedGrade,
    setSelectedGrade
  ] = useState(null);




  // 🔥 INITIAL FETCH
  useEffect(() => {

    fetchGrades();

  }, []);




  // 🔥 SUBMIT
  const handleSubmit =
    async (data) => {

      try {

        if (selectedGrade) {

          await updateGrade(
            selectedGrade.id,
            data
          );

        } else {

          await createGrade(
            data
          );
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

        await deleteGrade(id);

      } catch (err) {

        console.error(err);
      }
    };




  return (

    <div className="
      space-y-4
    ">

      <h1 className="
        text-xl
        font-bold
        text-white
      ">
        Grades
      </h1>



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
            students={[]}
          />

        )

      }



      {/* 🔄 LOADING */}
      {

        loading && (

          <p className="
            text-gray-400
          ">
            Loading data...
          </p>

        )

      }



      {/* ❌ ERROR */}
      {

        error && (

          <p className="
            text-red-400
          ">
            {error}
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

          <div className="card">

            <GradeList

              grades={grades}

              students={[]}

              onEdit={
                setSelectedGrade
              }

              onDelete={
                handleDelete
              }

              role={
                user?.role
              }

            />

          </div>

        )

      }

    </div>

  );
}