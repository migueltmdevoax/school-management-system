import { apiSlice } from "../../app/api/apiSlice";

export const studentsProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentProfile: builder.query({
      query: (studentId) => `/students/${studentId}/profile`,
      providesTags: (result, error, studentId) => [
        { type: "Students", id: studentId },
      ],
    }),
  }),
});

export const { useGetStudentProfileQuery } = studentsProfileApi;