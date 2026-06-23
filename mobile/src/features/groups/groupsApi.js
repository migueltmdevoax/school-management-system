import { apiSlice } from "../../app/api/apiSlice";

export const groupsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "/groups",
      providesTags: ["Groups"],
    }),
  }),
});

export const { useGetGroupsQuery } = groupsApi;