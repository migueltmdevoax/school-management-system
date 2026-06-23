import { apiSlice }       from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";

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

          // 🔥 CRÍTICO: resetea TODO el cache de RTK Query antes de guardar
          // las nuevas credenciales — previene que un parent vea datos del anterior
          dispatch(apiSlice.util.resetApiState());

          dispatch(setCredentials({ user: data.user, token: data.token }));

          localStorage.setItem("token", data.token);
          localStorage.setItem("role",  data.user?.role || "");
          localStorage.setItem("user",  JSON.stringify(data.user));
        } catch (error) {
          console.error("LOGIN ERROR:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;