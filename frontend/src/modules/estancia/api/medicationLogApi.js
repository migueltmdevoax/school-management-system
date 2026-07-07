import { apiSlice } from "../../../app/api/apiSlice";

export const medicationLogApi = apiSlice.injectEndpoints({
  endpoints: (b) => ({
    getMedicationByStudent: b.query({ query: (studentId) => `/medication-log/student/${studentId}`, providesTags: ["Medication"] }),
    getMedicationPending:   b.query({ query: () => "/medication-log/pending", providesTags: ["Medication"] }),
    createMedication:       b.mutation({ query: (body) => ({ url: "/medication-log", method: "POST", body }), invalidatesTags: ["Medication"] }),
    authorizeMedication:    b.mutation({ query: (id) => ({ url: `/medication-log/${id}/authorize`, method: "PUT" }), invalidatesTags: ["Medication"] }),
    markAdministered:       b.mutation({ query: (id) => ({ url: `/medication-log/${id}/administered`, method: "PUT" }), invalidatesTags: ["Medication"] }),
  }),
});
export const { useGetMedicationByStudentQuery, useGetMedicationPendingQuery, useCreateMedicationMutation, useAuthorizeMedicationMutation, useMarkAdministeredMutation } = medicationLogApi;