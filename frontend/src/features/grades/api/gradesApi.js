import { apiSlice } from "../../../app/api/apiSlice";

export const gradesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGrades: builder.query({
      query: () => "/grades",
      providesTags: ["Grades"],
    }),
    createGrade: builder.mutation({
      query: (data) => ({ url: "/grades", method: "POST", body: data }),
      invalidatesTags: ["Grades"],
    }),
    updateGrade: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/grades/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["Grades"],
    }),
    deleteGrade: builder.mutation({
      query: (id) => ({ url: `/grades/${id}`, method: "DELETE" }),
      invalidatesTags: ["Grades"],
    }),
  }),
});

export const {
  useGetGradesQuery,
  useCreateGradeMutation,
  useUpdateGradeMutation,
  useDeleteGradeMutation,
} = gradesApi;