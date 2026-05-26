import {
  apiSlice,
} from "../../app/api/apiSlice";



export const notificationsApi =
  apiSlice.injectEndpoints({

    endpoints: (builder) => ({

      // 🔥 GET MY NOTIFICATIONS
      getMyNotifications:

        builder.query({

          query: () =>

            "/notifications/my-notifications",

          providesTags:
            ["Notifications"],
        }),




      // 🔥 MARK AS READ
      markNotificationAsRead:

        builder.mutation({

          query: (id) => ({

            url:
              `/notifications/${id}/read`,

            method: "PUT",
          }),

          invalidatesTags:
            ["Notifications"],
        }),
    }),
  });



export const {

  useGetMyNotificationsQuery,

  useMarkNotificationAsReadMutation,

} = notificationsApi;