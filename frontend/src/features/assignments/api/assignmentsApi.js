import { apiSlice } from "../../../app/api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
      providesTags: ["Assignments"],
    }),
    getMyAssignments: builder.query({
      query: () => "/assignments/my-assignments",
      providesTags: ["Assignments"],
    }),
    createAssignment: builder.mutation({
      query: (data) => ({ url: "/assignments", method: "POST", body: data }),
      invalidatesTags: ["Assignments"],
    }),
    updateAssignment: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/assignments/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Assignments"],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({ url: `/assignments/${id}`, method: "DELETE" }),
      invalidatesTags: ["Assignments"],
    }),
    createSubmission: builder.mutation({
      query: (data) => ({ url: "/assignments/submissions", method: "POST", body: data }),
      invalidatesTags: ["Assignments"],
    }),
    gradeSubmission: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/assignments/submissions/${id}/grade`, method: "PUT", body: data }),
      invalidatesTags: ["Assignments"],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetMyAssignmentsQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
  useCreateSubmissionMutation,
  useGradeSubmissionMutation,
} = assignmentsApi;