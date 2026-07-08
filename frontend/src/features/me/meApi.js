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
    getMyChildren: b.query({
      query: () => "/me/children",
      providesTags: ["Students"],
    }),
  overrideExisting: false,
  }),
});

export const {
  useGetMyDashboardQuery,
  useGetMyStudentsQuery,
  useGetMyGradesQuery,
  useGetMyChildrenQuery,
} = meApi;