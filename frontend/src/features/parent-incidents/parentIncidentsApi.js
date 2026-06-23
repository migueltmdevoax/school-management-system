import { apiSlice } from "../../app/api/apiSlice";

export const parentIncidentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParentIncidents: builder.query({
      query: () => "/parent-incidents",
      providesTags: ["Incidents"],
    }),
  }),
});

export const { useGetParentIncidentsQuery } = parentIncidentsApi;