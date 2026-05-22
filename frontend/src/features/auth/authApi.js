import { apiSlice } from "../../app/api/apiSlice";

import { setCredentials } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setCredentials({
              user: data.user,
              token: data.token,
            })
          );
        } catch (error) {
          console.error("LOGIN ERROR:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;