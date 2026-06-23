import { apiSlice } from "../../app/api/apiSlice";

export const teacherAttendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markTeacherAttendance: builder.mutation({
      query: (data) => ({ url: "/teacher-attendance", method: "POST", body: data }),
      invalidatesTags: ["Attendance"],
    }),
    getTeacherAttendance: builder.query({
      query: (teacherId) => `/teacher-attendance/teacher/${teacherId}`,
      providesTags: ["Attendance"],
    }),
  }),
});

export const {
  useMarkTeacherAttendanceMutation,
  useGetTeacherAttendanceQuery,
} = teacherAttendanceApi;