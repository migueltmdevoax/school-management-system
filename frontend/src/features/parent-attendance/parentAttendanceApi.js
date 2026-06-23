import { apiSlice } from "../../app/api/apiSlice";

export const parentAttendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParentAttendance: builder.query({
      query: () => "/parent-attendance",
      providesTags: ["Attendance"],
    }),
  }),
});

export const { useGetParentAttendanceQuery } = parentAttendanceApi;