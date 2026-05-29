import {
  apiSlice,
} from "../../app/api/apiSlice";

export const
parentGradesApi =
  apiSlice.injectEndpoints({

    endpoints:
      (builder) => ({



        // 🟣 GET
        getParentGrades:
          builder.query({

            query:
              () =>
                "/parent-grades",

            providesTags: [
              "PARENT_GRADES",
            ],

          }),

      }),

  });

export const {

  useGetParentGradesQuery,

} = parentGradesApi;