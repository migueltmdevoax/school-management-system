import {
  apiSlice,
} from "../../app/api/apiSlice";

export const
teacherAttendanceApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({



        // 🟣 MARK
        markTeacherAttendance:
          builder.mutation({

            query:
              (data) => ({

                url:
                  "/teacher-attendance",

                method:
                  "POST",

                body:
                  data,

              }),

            invalidatesTags: [
              "TEACHER_ATTENDANCE",
            ],

          }),




        // 🟣 GET
        getTeacherAttendance:
          builder.query({

            query:
              (teacherId) =>

                `/teacher-attendance/teacher/${teacherId}`,

            providesTags: [
              "TEACHER_ATTENDANCE",
            ],

          }),

      }),

  });

export const {

  useMarkTeacherAttendanceMutation,

  useGetTeacherAttendanceQuery,

} = teacherAttendanceApi;