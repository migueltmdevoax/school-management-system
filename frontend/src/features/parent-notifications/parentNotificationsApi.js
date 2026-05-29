import {
  apiSlice,
} from "../../app/api/apiSlice";

export const
parentNotificationsApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({



        // 🟣 GET
        getParentNotifications:
          builder.query({

            query:
              () =>
                "/parent-notifications",

            providesTags: [
              "PARENT_NOTIFICATIONS",
            ],

          }),




        // 🟣 READ
        markParentNotificationRead:
          builder.mutation({

            query:
              (id) => ({

                url:
                  `/parent-notifications/${id}/read`,

                method:
                  "PATCH",

              }),

            invalidatesTags: [
              "PARENT_NOTIFICATIONS",
            ],

          }),

      }),

  });

export const {

  useGetParentNotificationsQuery,

  useMarkParentNotificationReadMutation,

} = parentNotificationsApi;