import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";


// 🔥 BASE QUERY
const baseQuery =
  fetchBaseQuery({

    baseUrl:
      "http://localhost:3000/api",

    prepareHeaders: (
      headers,
      { getState }
    ) => {

      // 🔥 AUTH TOKEN
      const token =
        getState()?.auth?.token;

      if (token) {

        headers.set(
          "authorization",
          `Bearer ${token}`
        );

      }

      return headers;

    }

  });


// 🔥 API SLICE
export const apiSlice =
  createApi({

    reducerPath: "api",

    baseQuery,

    tagTypes: [

      "Students",
      "Teachers",
      "Groups",
      "Grades",
      "Incidents",
      "Parents",
      "Payments",
      "Assignments",
      "Dashboard",
      "Notifications",
      "Activity"

    ],

    endpoints: () => ({})

  });