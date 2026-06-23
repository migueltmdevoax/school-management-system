import { apiSlice } from "../../app/api/apiSlice";

export const searchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    globalSearch: builder.query({
      query: (query) => `/search?q=${query}`,
    }),
  }),
});

export const { useGlobalSearchQuery } = searchApi;