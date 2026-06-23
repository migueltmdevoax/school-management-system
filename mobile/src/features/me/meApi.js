import { apiSlice } from "../../app/api/apiSlice";

export const meApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyDashboard: builder.query({
      query: () => "/me/dashboard",
      providesTags: ["Dashboard"],
    }),
    getMyStudents: builder.query({
      query: () => "/me/students",
      providesTags: ["Students"],
    }),
    getMyGrades: builder.query({
      query: () => "/me/grades",
      providesTags: ["Grades"],
    }),
  }),
});

export const {
  useGetMyDashboardQuery,
  useGetMyStudentsQuery,
  useGetMyGradesQuery,
} = meApi;