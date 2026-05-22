
import { useState } from "react";

import { apiFetch }
  from "../lib/api";



export function useStudents() {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);



  // 🔥 FETCH STUDENTS
  const fetchStudents =
    async () => {

      try {

        setLoading(true);
        setError(null);

        const data =
          await apiFetch(
            "/students"
          );

        setStudents(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.error(
          "FETCH STUDENTS ERROR:",
          err
        );

        setError(
          err.message
        );

      } finally {

        setLoading(false);
      }
    };



  // 🔥 ADD STUDENT
  const addStudent =
    async (student) => {

      try {

        setError(null);

        const createdStudent =
          await apiFetch(
            "/students",
            {
              method: "POST",

              body: JSON.stringify(
                student
              ),
            }
          );

        // 🔥 optimistic update
        setStudents(prev => [
          createdStudent,
          ...prev,
        ]);

        return createdStudent;

      } catch (err) {

        console.error(
          "ADD STUDENT ERROR:",
          err
        );

        setError(
          err.message
        );

        throw err;
      }
    };



  // 🔥 DELETE STUDENT
  const deleteStudent =
    async (id) => {

      try {

        setError(null);

        await apiFetch(
          `/students/${id}`,
          {
            method: "DELETE",
          }
        );

        setStudents(prev =>

          prev.filter(
            student =>
              student.id !== id
          )
        );

      } catch (err) {

        console.error(
          "DELETE STUDENT ERROR:",
          err
        );

        setError(
          err.message
        );

        throw err;
      }
    };



  // 🔥 EDIT STUDENT
  const editStudent =
    async (id, data) => {

      try {

        setError(null);

        const updatedStudent =
          await apiFetch(
            `/students/${id}`,
            {
              method: "PUT",

              body: JSON.stringify(
                data
              ),
            }
          );

        setStudents(prev =>

          prev.map(student =>

            student.id === id
              ? {
                  ...student,
                  ...updatedStudent,
                }
              : student
          )
        );

        return updatedStudent;

      } catch (err) {

        console.error(
          "EDIT STUDENT ERROR:",
          err
        );

        setError(
          err.message
        );

        throw err;
      }
    };



  return {

    students,

    loading,

    error,

    fetchStudents,

    addStudent,

    deleteStudent,

    editStudent,
  };
}

