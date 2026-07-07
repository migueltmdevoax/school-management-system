import { apiSlice } from "../../../app/api/apiSlice";

export const milestonesApi = apiSlice.injectEndpoints({
  endpoints: (b) => ({
    getMilestones:   b.query({ query: (studentId) => `/milestones/student/${studentId}`, providesTags: ["Milestones"] }),
    createMilestone: b.mutation({ query: (body) => ({ url: "/milestones", method: "POST", body }), invalidatesTags: ["Milestones"] }),
  }),
});
export const { useGetMilestonesQuery, useCreateMilestoneMutation } = milestonesApi;