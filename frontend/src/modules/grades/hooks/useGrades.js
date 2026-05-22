
import { useState }
  from "react";

import { apiFetch }
  from "../lib/api";



export function useGrades() {

  const [grades, setGrades] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);



  // 🔥 FETCH
  const fetchGrades =
    async () => {

      try {

        setLoading(true);
        setError(null);

        const data =
          await apiFetch(
            "/grades"
          );

        setGrades(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.error(
          "FETCH GRADES ERROR:",
          err
        );

        setError(
          err.message
        );

      } finally {

        setLoading(false);
      }
    };



  // 🔥 CREATE
  const createGrade =
    async (grade) => {

      try {

        setError(null);

        const createdGrade =
          await apiFetch(
            "/grades",
            {
              method: "POST",

              body: JSON.stringify(
                grade
              ),
            }
          );

        // 🔥 optimistic update
        setGrades(prev => [
          createdGrade,
          ...prev,
        ]);

        return createdGrade;

      } catch (err) {

        console.error(
          "CREATE GRADE ERROR:",
          err
        );

        setError(
          err.message
        );

        throw err;
      }
    };



  // 🔥 UPDATE
  const updateGrade =
    async (
      id,
      grade
    ) => {

      try {

        setError(null);

        const updatedGrade =
          await apiFetch(
            `/grades/${id}`,
            {
              method: "PUT",

              body: JSON.stringify(
                grade
              ),
            }
          );

        setGrades(prev =>

          prev.map(item =>

            item.id === id
              ? {
                  ...item,
                  ...updatedGrade,
                }
              : item
          )
        );

        return updatedGrade;

      } catch (err) {

        console.error(
          "UPDATE GRADE ERROR:",
          err
        );

        setError(
          err.message
        );

        throw err;
      }
    };



  // 🔥 DELETE
  const deleteGrade =
    async (id) => {

      try {

        setError(null);

        await apiFetch(
          `/grades/${id}`,
          {
            method: "DELETE",
          }
        );

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
          err.message
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
  };
}

