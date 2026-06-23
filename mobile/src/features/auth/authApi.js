import { apiSlice }       from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";
import AsyncStorage       from "@react-native-async-storage/async-storage";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url:    "/auth/login",
        method: "POST",
        body:   credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // 🔥 Resetea TODO el cache antes de guardar nuevas credenciales
          dispatch(apiSlice.util.resetApiState());

          dispatch(setCredentials({ user: data.user, token: data.token }));

          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("role",  data.user?.role || "");
          await AsyncStorage.setItem("user",  JSON.stringify(data.user));
        } catch (error) {
          console.error("LOGIN ERROR:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;