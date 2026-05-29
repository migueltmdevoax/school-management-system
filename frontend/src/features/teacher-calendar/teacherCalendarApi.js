import {
  apiSlice,
} from "../../app/api/apiSlice";

export const
teacherCalendarApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({



        getTeacherCalendar:
          builder.query({

            query:
              () =>
                "/teacher-calendar",

            providesTags: [
              "TEACHER_CALENDAR",
            ],

          }),

      }),

  });

export const {

  useGetTeacherCalendarQuery,

} = teacherCalendarApi;