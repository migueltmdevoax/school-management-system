import { apiSlice } from "../../app/api/apiSlice";

export const parentPaymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParentPayments: builder.query({
      query: () => "/parent-payments",
      providesTags: ["Payments"],
    }),
  }),
});

export const { useGetParentPaymentsQuery } = parentPaymentsApi;