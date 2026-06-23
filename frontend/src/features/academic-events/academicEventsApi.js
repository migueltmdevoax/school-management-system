import { apiSlice } from "../../app/api/apiSlice";

export const academicEventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicEvents: builder.query({
      query: () => "/academic-events",
      providesTags: ["AcademicEvents"],
    }),
    createAcademicEvent: builder.mutation({
      query: (data) => ({ url: "/academic-events", method: "POST", body: data }),
      invalidatesTags: ["AcademicEvents"],
    }),
  }),
});

export const {
  useGetAcademicEventsQuery,
  useCreateAcademicEventMutation,
} = academicEventsApi;