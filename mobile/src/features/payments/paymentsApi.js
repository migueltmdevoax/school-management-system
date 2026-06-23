import { apiSlice } from "../../app/api/apiSlice";

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),
    createPayment: builder.mutation({
      query: (body) => ({ url: "/payments", method: "POST", body }),
      invalidatesTags: ["Payments", "Dashboard"],
    }),
    markAsPaid: builder.mutation({
      query: (id) => ({ url: `/payments/${id}/pay`, method: "PATCH" }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useCreatePaymentMutation,
  useMarkAsPaidMutation,
} = paymentsApi;