import { apiSlice } from "../../app/api/apiSlice";

export const parentAssignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParentAssignments: builder.query({
      query: () => "/parent-assignments",
      providesTags: ["Assignments"],
    }),
  }),
});

export const { useGetParentAssignmentsQuery } = parentAssignmentsApi;