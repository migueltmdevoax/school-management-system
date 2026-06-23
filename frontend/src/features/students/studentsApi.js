import { apiSlice } from "../../app/api/apiSlice";
import { TAG_TYPES } from "../../services/api/tagTypes";

export const studentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      providesTags: [TAG_TYPES.STUDENTS],
    }),

    // 🔥 Nuevo — perfil completo del estudiante para Student Metrics
    getStudentProfile: builder.query({
      query: (studentId) => `/students/${studentId}/profile`,
      providesTags: (result, error, id) => [{ type: TAG_TYPES.STUDENTS, id }],
    }),

    addStudent: builder.mutation({
      query: (student) => ({ url: "/students", method: "POST", body: student }),
      async onQueryStarted(student, { dispatch, queryFulfilled }) {
        const tempId = crypto.randomUUID();
        const optimistic = {
          id: tempId, ...student, optimistic: true, status: "syncing",
          metrics: { average: 0, incidents: 0, pendingPayments: 0, attendanceRate: 0, risk: "low" },
        };
        const patch = dispatch(
          studentsApi.util.updateQueryData("getStudents", undefined, (draft) => {
            draft.unshift(optimistic);
          })
        );
        try {
          const { data: created } = await queryFulfilled;
          dispatch(
            studentsApi.util.updateQueryData("getStudents", undefined, (draft) => {
              const idx = draft.findIndex((s) => s.id === tempId);
              if (idx !== -1) draft[idx] = { ...created, optimistic: false, status: "synced" };
            })
          );
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [TAG_TYPES.STUDENTS],
    }),

    updateStudent: builder.mutation({
      query: ({ id, data }) => ({ url: `/students/${id}`, method: "PUT", body: data }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          studentsApi.util.updateQueryData("getStudents", undefined, (draft) => {
            const s = draft.find((s) => s.id === id);
            if (s) { Object.assign(s, data); s.status = "syncing"; }
          })
        );
        try {
          await queryFulfilled;
          dispatch(
            studentsApi.util.updateQueryData("getStudents", undefined, (draft) => {
              const s = draft.find((s) => s.id === id);
              if (s) s.status = "synced";
            })
          );
        } catch { patch.undo(); }
      },
      invalidatesTags: [TAG_TYPES.STUDENTS],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({ url: `/students/${id}`, method: "DELETE" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          studentsApi.util.updateQueryData("getStudents", undefined, (draft) => {
            const idx = draft.findIndex((s) => s.id === id);
            if (idx !== -1) draft.splice(idx, 1);
          })
        );
        try { await queryFulfilled; } catch { patch.undo(); }
      },
      invalidatesTags: [TAG_TYPES.STUDENTS],
    }),

    bulkDeleteStudents: builder.mutation({
      query: (studentIds) => ({
        url: "/students/bulk-delete", method: "POST", body: { studentIds },
      }),
      async onQueryStarted(studentIds, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          studentsApi.util.updateQueryData("getStudents", undefined, (draft) =>
            draft.filter((s) => !studentIds.includes(s.id))
          )
        );
        try { await queryFulfilled; } catch { patch.undo(); }
      },
      invalidatesTags: [TAG_TYPES.STUDENTS],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentProfileQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useBulkDeleteStudentsMutation,
} = studentsApi;