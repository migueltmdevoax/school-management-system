import { apiSlice }
  from "../../../app/api/apiSlice";

export const teachersApi =
  apiSlice.injectEndpoints({

    endpoints: (builder) => ({

      // 🔥 GET ALL
      getTeachers:
        builder.query({

          query: () =>
            "/teachers",

          providesTags:
            ["Teachers"]

        }),

      // 🔥 GET ONE
      getTeacherById:
        builder.query({

          query: (id) =>
            `/teachers/${id}`,

          providesTags:
            (result, error, id) => [
              {
                type: "Teachers",
                id
              }
            ]

        }),

      // 🔥 CREATE
      createTeacher:
        builder.mutation({

          query: (teacherData) => ({

            url: "/teachers",

            method: "POST",

            body: teacherData

          }),

          invalidatesTags:
            ["Teachers"]

        }),

      // 🔥 UPDATE
      updateTeacher:
        builder.mutation({

          query: ({
            id,
            ...data
          }) => ({

            url:
              `/teachers/${id}`,

            method: "PUT",

            body: data

          }),

          invalidatesTags:
            ["Teachers"]

        }),

      // 🔥 DELETE
      deleteTeacher:
        builder.mutation({

          query: (id) => ({

            url:
              `/teachers/${id}`,

            method: "DELETE"

          }),

          invalidatesTags:
            ["Teachers"]

        })

    })

  });

export const {

  useGetTeachersQuery,

  useGetTeacherByIdQuery,

  useCreateTeacherMutation,

  useUpdateTeacherMutation,

  useDeleteTeacherMutation

} = teachersApi;