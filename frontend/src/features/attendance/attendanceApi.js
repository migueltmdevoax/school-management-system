import { apiSlice } from "../../app/api/apiSlice";

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendance: builder.query({
      query: (date) => date ? `/attendance?date=${date}` : "/attendance",
      providesTags: ["Attendance"],
    }),
    markAttendance: builder.mutation({
      query: (body) => ({ url: "/attendance", method: "POST", body }),
      invalidatesTags: ["Attendance", "Dashboard"],
    }),
  }),
});

export const { useGetAttendanceQuery, useMarkAttendanceMutation } = attendanceApi;