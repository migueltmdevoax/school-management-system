import { apiSlice }
from "../api/apiSlice";

export const activityApi =
  apiSlice.injectEndpoints({

    endpoints: (builder) => ({

      getEntityActivity:
        builder.query({

          query: ({
            entityType,
            entityId,
          }) => ({

            url:
              `/activity/${entityType}/${entityId}`,

          }),

          providesTags: (
            result,
            error,
            arg
          ) => [

            {
              type: "Activity",
              id: `${arg.entityType}-${arg.entityId}`,
            },

          ],

        }),

    }),

});

export const {
  useGetEntityActivityQuery,
} = activityApi;