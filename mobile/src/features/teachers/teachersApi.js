import { apiSlice } from "../../app/api/apiSlice";

export const teachersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => "/teachers",
      providesTags: ["Teachers"],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({ url: `/teachers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const { useGetTeachersQuery, useDeleteTeacherMutation } = teachersApi;