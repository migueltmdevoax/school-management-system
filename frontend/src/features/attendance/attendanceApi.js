import {
  apiSlice,
} from "../../app/api/apiSlice";

export const attendanceApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({



        // 🟣 MARK
        markAttendance:
          builder.mutation({

            query:
              (data) => ({

                url:
                  "/attendance",

                method:
                  "POST",

                body:
                  data,

              }),

            invalidatesTags: [
              "ATTENDANCE",
            ],

          }),




        // 🟣 GET STUDENT
        getStudentAttendance:
          builder.query({

            query:
              (studentId) =>

                `/attendance/student/${studentId}`,

            providesTags: [
              "ATTENDANCE",
            ],

          }),

      }),

  });

export const {

  useMarkAttendanceMutation,

  useGetStudentAttendanceQuery,

} = attendanceApi;