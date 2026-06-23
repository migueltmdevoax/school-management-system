import { apiSlice } from "../../app/api/apiSlice";

export const parentNotificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParentNotifications: builder.query({
      query: () => "/parent-notifications",
      providesTags: ["Notifications"],
    }),
    markParentNotificationRead: builder.mutation({
      query: (id) => ({ url: `/parent-notifications/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetParentNotificationsQuery,
  useMarkParentNotificationReadMutation,
} = parentNotificationsApi;