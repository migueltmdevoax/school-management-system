import { apiSlice } from "../../app/api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: () => "/notifications/my-notifications",
      providesTags: ["Notifications"],
      // 🔥 Refresca cada 30 segundos automáticamente
      keepUnusedDataFor: 0,
    }),
    markNotificationAsRead: builder.mutation({
      query: (id) => ({ url: `/notifications/${id}/read`, method: "PUT" }),
      invalidatesTags: ["Notifications"],
    }),
    markAllAsRead: builder.mutation({
      query: () => ({ url: "/notifications/read-all", method: "PUT" }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationsApi;