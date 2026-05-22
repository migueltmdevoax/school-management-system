import { useState } from "react";

const API_URL =
  "http://localhost:3000/api/grades";



export function useGrades() {

  const [grades, setGrades] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);



  // 🟣 FETCH GRADES
  const fetchGrades =
    async () => {

      try {

        setLoading(true);
        setError(null);

        const token =
          localStorage.getItem("token");



        const res =
          await fetch(API_URL, {

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

          });



        if (!res.ok) {

          throw new Error(
            "Error fetching grades"
          );
        }



        const data =
          await res.json();



        setGrades(
          Array.isArray(data)
            ? data
            : data.data || []
        );

      } catch (err) {

        console.error(
          "FETCH GRADES ERROR:",
          err
        );

        setError(
          err.message ||
          "Failed to fetch grades"
        );

      } finally {

        setLoading(false);
      }
    };



  // 🟣 CREATE GRADE
  const createGrade =
    async (gradeData) => {

      try {

        setError(null);

        const token =
          localStorage.getItem("token");



        const res =
          await fetch(API_URL, {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

            },

            body: JSON.stringify(
              gradeData
            ),

          });



        if (!res.ok) {

          throw new Error(
            "Error creating grade"
          );
        }



        const newGrade =
          await res.json();



        setGrades(prev => [
          newGrade,
          ...prev,
        ]);



        return newGrade;

      } catch (err) {

        console.error(
          "CREATE GRADE ERROR:",
          err
        );

        setError(
          err.message ||
          "Failed to create grade"
        );

        throw err;
      }
    };



  // 🟣 UPDATE GRADE
  const updateGrade =
    async (id, gradeData) => {

      try {

        setError(null);

        const token =
          localStorage.getItem("token");



        const res =
          await fetch(
            `${API_URL}/${id}`,
            {

              method: "PUT",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,

              },

              body: JSON.stringify(
                gradeData
              ),

            }
          );



        if (!res.ok) {

          throw new Error(
            "Error updating grade"
          );
        }



        const updatedGrade =
          await res.json();



        setGrades(prev =>

          prev.map(grade =>

            grade.id === id
              ? updatedGrade
              : grade
          )
        );



        return updatedGrade;

      } catch (err) {

        console.error(
          "UPDATE GRADE ERROR:",
          err
        );

        setError(
          err.message ||
          "Failed to update grade"
        );

        throw err;
      }
    };



  // 🟣 DELETE GRADE
  const deleteGrade =
    async (id) => {

      try {

        setError(null);

        const token =
          localStorage.getItem("token");



        const res =
          await fetch(
            `${API_URL}/${id}`,
            {

              method: "DELETE",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

            }
          );



        if (!res.ok) {

          throw new Error(
            "Error deleting grade"
          );
        }



        setGrades(prev =>

          prev.filter(
            grade =>
              grade.id !== id
          )
        );

      } catch (err) {

        console.error(
          "DELETE GRADE ERROR:",
          err
        );

        setError(
          err.message ||
          "Failed to delete grade"
        );

        throw err;
      }
    };



  return {

    grades,
    loading,
    error,

    fetchGrades,

    createGrade,
    updateGrade,
    deleteGrade,

    setGrades,

  };
}