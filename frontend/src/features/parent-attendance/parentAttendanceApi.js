import {
  apiSlice,
} from "../../app/api/apiSlice";

export const
parentAttendanceApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({



        // 🟣 GET
        getParentAttendance:
          builder.query({

            query:
              () =>
                "/parent-attendance",

            providesTags: [
              "PARENT_ATTENDANCE",
            ],

          }),

      }),

  });

export const {

  useGetParentAttendanceQuery,

} = parentAttendanceApi;