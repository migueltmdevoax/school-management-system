import { apiSlice } from "../../../app/api/apiSlice";

export const teachersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => "/teachers",
      providesTags: ["Teachers"],
    }),
    getTeacherById: builder.query({
      query: (id) => `/teachers/${id}`,
      providesTags: (result, error, id) => [{ type: "Teachers", id }],
    }),
    createTeacher: builder.mutation({
      query: (data) => ({ url: "/teachers", method: "POST", body: data }),
      invalidatesTags: ["Teachers"],
    }),
    updateTeacher: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/teachers/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Teachers"],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({ url: `/teachers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherByIdQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teachersApi;