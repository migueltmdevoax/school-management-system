import {
  apiSlice
} from "../../app/api/apiSlice";

export const paymentsApi =
  apiSlice.injectEndpoints({

    endpoints: (builder) => ({

      createPayment:
        builder.mutation({

          query: (body) => ({

            url:
              "/payments",

            method:
              "POST",

            body,

          }),

        }),

    }),

  });

export const {

  useCreatePaymentMutation,

} = paymentsApi;