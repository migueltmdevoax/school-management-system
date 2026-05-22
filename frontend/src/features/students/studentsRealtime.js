import {
  studentsApi,
} from "./studentsApi";



export function studentsRealtimeListeners(
  store
) {

  return [

    // 🟣 STUDENT UPDATED
    {
      event: "student_updated",

      handler: (updatedStudent) => {

        store.dispatch(

          studentsApi.util
            .updateQueryData(

              "getStudents",

              undefined,

              (draft) => {

                const index =

                  draft.findIndex(
                    (student) =>

                      student.id ===
                      updatedStudent.id
                  );



                if (index !== -1) {

                  draft[index] = {

                    ...draft[index],

                    ...updatedStudent,
                  };
                }
              }
            )
        );
      },
    },





    // 🟣 STUDENT CREATED
    {
      event: "student_created",

      handler: (newStudent) => {

        store.dispatch(

          studentsApi.util
            .updateQueryData(

              "getStudents",

              undefined,

              (draft) => {

                const exists =

                  draft.some(
                    (student) =>

                      student.id ===
                      newStudent.id
                  );



                if (!exists) {

                  draft.unshift(
                    newStudent
                  );
                }
              }
            )
        );
      },
    },






    // 🟣 STUDENT DELETED
    {
      event: "student_deleted",

      handler: (studentId) => {

        store.dispatch(

          studentsApi.util
            .updateQueryData(

              "getStudents",

              undefined,

              (draft) =>

                draft.filter(
                  (student) =>

                    student.id !==
                    studentId
                )
            )
        );
      },
    },
  ];
}