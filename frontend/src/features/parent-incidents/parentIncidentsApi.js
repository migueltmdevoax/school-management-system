import {
  apiSlice,
} from "../../app/api/apiSlice";

export const
parentIncidentsApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({



        // 🟣 GET
        getParentIncidents:
          builder.query({

            query:
              () =>
                "/parent-incidents",

            providesTags: [
              "PARENT_INCIDENTS",
            ],

          }),

      }),

  });

export const {

  useGetParentIncidentsQuery,

} = parentIncidentsApi;