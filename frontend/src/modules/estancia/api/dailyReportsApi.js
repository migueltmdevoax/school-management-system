import { apiSlice } from "../../../app/api/apiSlice";

export const dailyReportsApi = apiSlice.injectEndpoints({
  endpoints: (b) => ({
    getDailyReports:    b.query({ query: (studentId) => `/daily-reports/student/${studentId}`, providesTags: ["DailyReports"] }),
    getDailyByDate:     b.query({ query: (date) => `/daily-reports?date=${date}`, providesTags: ["DailyReports"] }),
    createDailyReport:  b.mutation({ query: (body) => ({ url: "/daily-reports", method: "POST", body }), invalidatesTags: ["DailyReports"] }),
  }),
});
export const { useGetDailyReportsQuery, useGetDailyByDateQuery, useCreateDailyReportMutation } = dailyReportsApi;