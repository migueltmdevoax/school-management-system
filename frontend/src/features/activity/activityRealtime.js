import {
  activityApi
} from "./activityApi";

import {
  EVENTS
} from "../../constants/events";

export const activityRealtimeListeners =
  (store) => [

    {

      event:
        EVENTS.ACTIVITY_CREATED,

      handler:
        (payload) => {

          const entityType =
            payload.entity_type;

          const entityId =
            payload.entity_id;

          store.dispatch(

            activityApi.util
              .updateQueryData(

                "getEntityActivity",

                {
                  entityType,
                  entityId,
                },

                (draft) => {

                  if (!draft?.data)
                    return;

                  const exists =

                    draft.data.some(
                      (item) =>
                        item.id === payload.id
                    );

                  if (exists)
                    return;

                  draft.data.unshift(
                    payload
                  );

                }

              )

          );

        },

    },

  ];