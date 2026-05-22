import { apiSlice }
from "../../app/api/apiSlice";



export const meApi =
  apiSlice.injectEndpoints({

    endpoints: (builder) => ({



      // 🧠 MY DASHBOARD
      getMyDashboard:
        builder.query({

          query: () =>
            "/me/dashboard",

          providesTags: [
            "Dashboard"
          ],

        }),




      // 👨‍🎓 MY STUDENTS
      getMyStudents:
        builder.query({

          query: () =>
            "/me/students",

          providesTags: [
            "Students"
          ],

        }),




      // 📚 MY ASSIGNMENTS
      getMyAssignments:
        builder.query({

          query: () =>
            "/me/assignments",

          providesTags: [
            "Assignments"
          ],

        }),




      // 📝 MY GRADES
      getMyGrades:
        builder.query({

          query: () =>
            "/me/grades",

          providesTags: [
            "Grades"
          ],

        }),




      // 💳 MY PAYMENTS
      getMyPayments:
        builder.query({

          query: () =>
            "/me/payments",

          providesTags: [
            "Payments"
          ],

        }),

    }),

  });





export const {

  useGetMyDashboardQuery,

  useGetMyStudentsQuery,

  useGetMyAssignmentsQuery,

  useGetMyGradesQuery,

  useGetMyPaymentsQuery,

} = meApi;