import { apiSlice } from "../../app/api/apiSlice";

export const meApi = apiSlice.injectEndpoints({
  overrideExisting: false, // 🔥 Va aquí afuera, no dentro de endpoints
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
    getMyChildren: builder.query({ // 🔥 Era b.query, debe ser builder.query
      query: () => "/me/children",
      providesTags: ["Students"],
    }),
  }),
});

export const {
  useGetMyDashboardQuery,
  useGetMyStudentsQuery,
  useGetMyGradesQuery,
  useGetMyChildrenQuery,
} = meApi;