import { apiSlice }
from "../../app/api/apiSlice";

export const dashboardApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({

        getDashboard:
          builder.query({

            query:
              () => "/dashboard",

          }),

      }),

  });

export const {

  useGetDashboardQuery,

} = dashboardApi;