import { apiSlice } from "../../../app/api/apiSlice";

export const pickupControlApi = apiSlice.injectEndpoints({
  endpoints: (b) => ({
    getPickupByDate:    b.query({ query: (date) => `/pickup-control?date=${date}`, providesTags: ["Pickup"] }),
    getPickupByStudent: b.query({ query: ({ studentId, date }) => `/pickup-control/student/${studentId}?date=${date}`, providesTags: ["Pickup"] }),
    createPickup:       b.mutation({ query: (body) => ({ url: "/pickup-control", method: "POST", body }), invalidatesTags: ["Pickup"] }),
  }),
});
export const { useGetPickupByDateQuery, useGetPickupByStudentQuery, useCreatePickupMutation } = pickupControlApi;