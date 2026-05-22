import { apiSlice }
from "../../app/api/apiSlice";

import {
  TAG_TYPES,
} from "../../services/api/tagTypes";



export const studentsApi =
  apiSlice.injectEndpoints({

    endpoints: (builder) => ({

      // 🟣 GET STUDENTS
      getStudents:
        builder.query({

          query: () =>
            "/students",

          providesTags: [
            TAG_TYPES.STUDENTS
          ],
        }),





      // 🟣 CREATE STUDENT
      addStudent:
        builder.mutation({

          query: (student) => ({

            url: "/students",

            method: "POST",

            body: student,
          }),




          async onQueryStarted(

            student,

            {

              dispatch,

              queryFulfilled,
            }

          ) {

            const tempId =
              crypto.randomUUID();




            const optimisticStudent = {

              id: tempId,

              ...student,

              optimistic: true,

              status: "syncing",

              metrics: {
                average: 0,
                progress: 0,
                incidents: 0,
                pendingPayments: 0,
                risk: "low",
              },
            };




            const patchResult =

              dispatch(

                studentsApi.util
                  .updateQueryData(

                    "getStudents",

                    undefined,

                    (draft) => {

                      draft.unshift(
                        optimisticStudent
                      );
                    }
                  )
              );




            try {

              const {

                data:
                  createdStudent,

              } = await queryFulfilled;




              dispatch(

                studentsApi.util
                  .updateQueryData(

                    "getStudents",

                    undefined,

                    (draft) => {

                      const index =

                        draft.findIndex(
                          student =>
                            student.id === tempId
                        );



                      if (
                        index !== -1
                      ) {

                        draft[index] = {

                          ...createdStudent,

                          optimistic: false,

                          status: "synced",
                        };
                      }
                    }
                  )
              );



            } catch {

              patchResult.undo();
            }
          },

          invalidatesTags: [
            TAG_TYPES.STUDENTS
          ],
        }),





      // 🟣 DELETE STUDENT
      deleteStudent:
        builder.mutation({

          query: (id) => ({

            url:
              `/students/${id}`,

            method: "DELETE",
          }),

          async onQueryStarted(

  id,

  {

    dispatch,

    queryFulfilled,
  }

) {

  const patchResult =

    dispatch(

      studentsApi.util
        .updateQueryData(

          "getStudents",

          undefined,

          (draft) => {

            const index =

              draft.findIndex(
                student =>
                  student.id === id
              );

            if (index !== -1) {

              draft.splice(index, 1);

            }

          }
        )
    );



  try {

    await queryFulfilled;

  } catch {

    patchResult.undo();
  }
},

          invalidatesTags: [
            TAG_TYPES.STUDENTS
          ],
        }),





      // 🟣 UPDATE STUDENT
      updateStudent:
        builder.mutation({

          query: ({
            id,
            data,
          }) => ({

            url:
              `/students/${id}`,

            method: "PUT",

            body: data,
          }),




          async onQueryStarted(

            {

              id,

              data,
            },

            {

              dispatch,

              queryFulfilled,
            }

          ) {

            const patchResult =

              dispatch(

                studentsApi.util
                  .updateQueryData(

                    "getStudents",

                    undefined,

                    (draft) => {

                      const student =

                        draft.find(
                          student =>
                            student.id === id
                        );



                      if (student) {

                        Object.assign(
                          student,
                          data
                        );



                        student.status =
                          "syncing";
                      }
                    }
                  )
              );



            try {

              await queryFulfilled;



              dispatch(

                studentsApi.util
                  .updateQueryData(

                    "getStudents",

                    undefined,

                    (draft) => {

                      const student =

                        draft.find(
                          student =>
                            student.id === id
                        );



                      if (student) {

                        student.status =
                          "synced";
                      }
                    }
                  )
              );



            } catch {

              patchResult.undo();
            }
          },

          invalidatesTags: [
            TAG_TYPES.STUDENTS
          ],
        }),
    }),
  });





export const {

  useGetStudentsQuery,

  useAddStudentMutation,

  useDeleteStudentMutation,

  useUpdateStudentMutation,

} = studentsApi;