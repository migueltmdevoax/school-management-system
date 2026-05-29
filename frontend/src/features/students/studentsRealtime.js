import {
  studentsApi,
} from "./studentsApi";

import {
  apiSlice
} from "../../app/api/apiSlice";

import {
  EVENTS
} from "../../constants/events";

export function studentsRealtimeListeners(
  store
) {

  return [

    /*
    |--------------------------------------------------------------------------
    | 🟣 STUDENT UPDATED
    |--------------------------------------------------------------------------
    */

    {
      event:
        EVENTS.STUDENT_UPDATED,

      handler:
        (updatedStudent) => {

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





    /*
    |--------------------------------------------------------------------------
    | 🟣 STUDENT CREATED
    |--------------------------------------------------------------------------
    */

    {
      event:
        EVENTS.STUDENT_CREATED,

      handler:
        (newStudent) => {

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






    /*
    |--------------------------------------------------------------------------
    | 🟣 STUDENT DELETED
    |--------------------------------------------------------------------------
    */

    {
      event:
        EVENTS.STUDENT_DELETED,

      handler:
        (studentId) => {

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






    /*
    |--------------------------------------------------------------------------
    | 🟣 STUDENT METRICS UPDATED
    |--------------------------------------------------------------------------
    */

    {
      event:
        EVENTS.STUDENT_METRICS_UPDATED,

      handler:
        (payload) => {

          const {
            studentId,
            metrics,
          } = payload;



          store.dispatch(

            apiSlice.util
              .updateQueryData(

                "getStudentProfile",

                studentId,

                (draft) => {

                  if (!draft?.data)
                    return;



                  draft.data.metrics =
                    metrics.metrics;

                }

              )

          );

        },

    },

  ];

}