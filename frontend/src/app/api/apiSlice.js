import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    // Intenta del store primero, luego localStorage como fallback
    const token =
      getState()?.auth?.token ||
      localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    if (!window.location.pathname.includes("/login")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Students","Teachers","Groups","Grades","Incidents",
    "Parents","Payments","Assignments","Dashboard",
    "Notifications","Activity","Attendance","AcademicEvents",
  ],
  endpoints: () => ({}),
});