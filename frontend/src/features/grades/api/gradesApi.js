import { apiSlice }
from "../../../app/api/apiSlice";

export const gradesApi =
  apiSlice.injectEndpoints({

    endpoints: (builder) => ({

      // 🔥 GET ALL ROLE-BASED GRADES
      getGrades:
        builder.query({

          query: () => "/grades",

          providesTags: [
            "Grades"
          ]

        }),




      // 🔥 CREATE GRADE
      createGrade:
        builder.mutation({

          query: (data) => ({

            url: "/grades",

            method: "POST",

            body: data

          }),

          invalidatesTags: [
            "Grades"
          ]

        }),




      // 🔥 UPDATE GRADE
      updateGrade:
        builder.mutation({

          query: ({
            id,
            ...data
          }) => ({

            url: `/grades/${id}`,

            method: "PUT",

            body: data

          }),

          invalidatesTags: [
            "Grades"
          ]

        }),




      // 🔥 DELETE GRADE
      deleteGrade:
        builder.mutation({

          query: (id) => ({

            url: `/grades/${id}`,

            method: "DELETE"

          }),

          invalidatesTags: [
            "Grades"
          ]

        })

    })

  });




export const {

  useGetGradesQuery,

  useCreateGradeMutation,

  useUpdateGradeMutation,

  useDeleteGradeMutation

} = gradesApi;