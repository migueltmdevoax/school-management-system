import {
  apiSlice,
} from "../../app/api/apiSlice";

export const
parentAssignmentsApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({



        // 🟣 GET
        getParentAssignments:
          builder.query({

            query:
              () =>
                "/parent-assignments",

            providesTags: [
              "PARENT_ASSIGNMENTS",
            ],

          }),

      }),

  });

export const {

  useGetParentAssignmentsQuery,

} = parentAssignmentsApi;