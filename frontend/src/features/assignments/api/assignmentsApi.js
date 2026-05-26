import { apiSlice }
from "../../../app/api/apiSlice";

export const assignmentsApi =
  apiSlice.injectEndpoints({

    endpoints: (builder) => ({

      // 🔥 GET ASSIGNMENTS
      getAssignments:
        builder.query({

          query: () =>
            "/assignments",

          providesTags:
            ["Assignments"]

        }),




      // 🔥 GET MY ASSIGNMENTS
      getMyAssignments:
        builder.query({

          query: () =>
            "/assignments/my-assignments",

          providesTags:
            ["Assignments"]

        }),




      // 🔥 CREATE ASSIGNMENT
      createAssignment:
        builder.mutation({

          query: (data) => ({

            url: "/assignments",

            method: "POST",

            body: data

          }),

          invalidatesTags:
            ["Assignments"]

        }),

    


      // 🔥 UPDATE ASSIGNMENT
      updateAssignment:
        builder.mutation({

          query: ({
            id,
            ...data
          }) => ({

            url:
              `/assignments/${id}`,

            method: "PUT",

            body: data

          }),

          invalidatesTags:
            ["Assignments"]

        }),

    


      // 🔥 DELETE ASSIGNMENT
      deleteAssignment:
        builder.mutation({

          query: (id) => ({

            url:
              `/assignments/${id}`,

            method: "DELETE"

          }),

          invalidatesTags:
            ["Assignments"]

        }),

    


      // 🔥 CREATE SUBMISSION
      createSubmission:
        builder.mutation({

          query: (data) => ({

            url:
              "/assignments/submissions",

            method: "POST",

            body: data

          }),

          invalidatesTags:
            ["Assignments"]

        }),

    


      // 🔥 GRADE SUBMISSION
      gradeSubmission:
        builder.mutation({

          query: ({
            id,
            ...data
          }) => ({

            url:
              `/assignments/submissions/${id}/grade`,

            method: "PUT",

            body: data

          }),

          invalidatesTags:
            ["Assignments"]

        })

    })

  });





export const {

  useGetAssignmentsQuery,

  useGetMyAssignmentsQuery,

  useCreateAssignmentMutation,

  useUpdateAssignmentMutation,

  useDeleteAssignmentMutation,

  useCreateSubmissionMutation,

  useGradeSubmissionMutation

} = assignmentsApi;