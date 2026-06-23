import { apiSlice } from "../../app/api/apiSlice";

export const incidentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIncidents: builder.query({
      query: () => "/incidents",
      providesTags: ["Incidents"],
    }),
    getIncidentsByStudent: builder.query({
      query: (studentId) => `/incidents/${studentId}`,
      providesTags: ["Incidents"],
    }),
    createIncident: builder.mutation({
      query: (body) => ({ url: "/incidents", method: "POST", body }),
      invalidatesTags: ["Incidents", "Dashboard"],
    }),
    deleteIncident: builder.mutation({
      query: (id) => ({ url: `/incidents/${id}`, method: "DELETE" }),
      invalidatesTags: ["Incidents"],
    }),
  }),
});

export const {
  useGetAllIncidentsQuery,
  useGetIncidentsByStudentQuery,
  useCreateIncidentMutation,
  useDeleteIncidentMutation,
} = incidentsApi;