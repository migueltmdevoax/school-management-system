import { apiSlice } from "../../app/api/apiSlice";

export const parentGradesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParentGrades: builder.query({
      query: () => "/parent-grades",
      providesTags: ["Grades"],
    }),
  }),
});

export const { useGetParentGradesQuery } = parentGradesApi;