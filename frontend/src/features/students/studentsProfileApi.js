import { apiSlice } from "../api/apiSlice";

export const studentsProfileApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getStudentProfile:
        builder.query({
          query: (studentId) => ({
            url: `/students/${studentId}/profile`,
          }),

          providesTags: (
            result,
            error,
            studentId
          ) => [
            {
              type: "Students",
              id: studentId,
            },
          ],
        }),
    }),
  });

export const {
  useGetStudentProfileQuery,
} = studentsProfileApi;