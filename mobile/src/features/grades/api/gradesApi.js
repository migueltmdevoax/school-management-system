import { apiSlice } from "../../../app/api/apiSlice";

export const gradesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGrades: builder.query({
      query: () => "/grades",
      providesTags: ["Grades"],
    }),
    createGradeByAssignmentAndStudent: builder.mutation({
      query: (data) => ({ url: "/grades/assignment-student", method: "POST", body: data }),
      invalidatesTags: ["Grades"],
    }),
  }),
});

export const {
  useGetGradesQuery,
  useCreateGradeByAssignmentAndStudentMutation,
} = gradesApi;