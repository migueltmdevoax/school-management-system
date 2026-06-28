import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IP de tu Mac en la red local — cámbiala por la tuya
// En terminal: ifconfig | grep "inet " | grep -v 127.0.0.1
const API_URL = "https://school-management-system-production-2929.up.railway.app/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: async (headers, { getState }) => {
    // Intenta del store primero, luego AsyncStorage como fallback
    const tokenFromStore = getState()?.auth?.token;
    const token = tokenFromStore || await AsyncStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("user");
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