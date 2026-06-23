import { apiSlice } from "../../app/api/apiSlice";

export const studentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      providesTags: ["Students"],
    }),
    addStudent: builder.mutation({
      query: (student) => ({ url: "/students", method: "POST", body: student }),
      invalidatesTags: ["Students"],
    }),
    updateStudent: builder.mutation({
      query: ({ id, data }) => ({ url: `/students/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({ url: `/students/${id}`, method: "DELETE" }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;