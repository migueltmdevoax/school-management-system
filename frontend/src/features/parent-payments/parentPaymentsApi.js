import {
  apiSlice,
} from "../../app/api/apiSlice";

export const
parentPaymentsApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({



        // 🟣 GET
        getParentPayments:
          builder.query({

            query:
              () =>
                "/parent-payments",

            providesTags: [
              "PARENT_PAYMENTS",
            ],

          }),

      }),

  });

export const {

  useGetParentPaymentsQuery,

} = parentPaymentsApi;