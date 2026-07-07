import { apiSlice } from "../../../app/api/apiSlice";

export const allergiesApi = apiSlice.injectEndpoints({
  endpoints: (b) => ({
    getAllergiesByStudent: b.query({ query: (studentId) => `/allergies/student/${studentId}`, providesTags: ["Allergies"] }),
    createAllergy:        b.mutation({ query: (body) => ({ url: "/allergies", method: "POST", body }), invalidatesTags: ["Allergies"] }),
    deleteAllergy:        b.mutation({ query: (id) => ({ url: `/allergies/${id}`, method: "DELETE" }), invalidatesTags: ["Allergies"] }),
  }),
});
export const { useGetAllergiesByStudentQuery, useCreateAllergyMutation, useDeleteAllergyMutation } = allergiesApi;