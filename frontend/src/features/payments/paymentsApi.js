import { apiSlice } from "../../app/api/apiSlice";

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => "/payments",
      providesTags: ["Payments"],
    }),
    getPaymentsByStudent: builder.query({
      query: (studentId) => `/payments/student/${studentId}`,
      providesTags: ["Payments"],
    }),
    createPayment: builder.mutation({
      query: (body) => ({ url: "/payments", method: "POST", body }),
      invalidatesTags: ["Payments", "Dashboard"],
    }),
    markAsPaid: builder.mutation({
      query: (id) => ({ url: `/payments/${id}/pay`, method: "PATCH" }),
      invalidatesTags: ["Payments", "Dashboard"],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({ url: `/payments/${id}`, method: "DELETE" }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentsByStudentQuery,
  useCreatePaymentMutation,
  useMarkAsPaidMutation,
  useDeletePaymentMutation,
} = paymentsApi;