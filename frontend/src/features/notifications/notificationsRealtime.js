import {
  notificationsApi,
} from "./notificationsApi";



export function notificationsRealtimeListeners(
  store
) {

  return [

    // 🔥 REALTIME NOTIFICATION
    {
      event:
        "notification_created",

      handler: (payload) => {

  store.dispatch(

    notificationsApi.util
      .updateQueryData(

        "getMyNotifications",

        undefined,

        (draft) => {

          if (!draft) return;

          const exists =

            draft.some(
              notification =>

                notification.id ===
                payload.id
            );



          if (!exists) {

            draft.unshift(
              payload
            );
          }
        }
      )
  );
},
},

];
}