import { apiSlice } from "../../app/api/apiSlice";

export const parentPortalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParentDashboard: builder.query({
      query: () => "/parent-portal/dashboard",
    }),
    getParentChildren: builder.query({
      query: () => "/parent-portal/children",
    }),
  }),
});

export const {
  useGetParentDashboardQuery,
  useGetParentChildrenQuery,
} = parentPortalApi;