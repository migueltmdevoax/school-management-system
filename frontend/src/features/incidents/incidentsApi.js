import {
  apiSlice
} from "../../app/api/apiSlice";

export const incidentsApi =
  apiSlice.injectEndpoints({

    endpoints: (builder) => ({

      createIncident:
        builder.mutation({

          query: (body) => ({

            url:
              "/incidents",

            method:
              "POST",

            body,

          }),

        }),

    }),

  });

export const {

  useCreateIncidentMutation,

} = incidentsApi;