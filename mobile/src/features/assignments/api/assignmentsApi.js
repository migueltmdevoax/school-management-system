import { apiSlice } from "../../../app/api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyAssignments: builder.query({
      query: () => "/assignments/my-assignments",
      providesTags: ["Assignments"],
    }),
    createAssignment: builder.mutation({
      query: (data) => ({ url: "/assignments", method: "POST", body: data }),
      invalidatesTags: ["Assignments"],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({ url: `/assignments/${id}`, method: "DELETE" }),
      invalidatesTags: ["Assignments"],
    }),
  }),
});

export const {
  useGetMyAssignmentsQuery,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;