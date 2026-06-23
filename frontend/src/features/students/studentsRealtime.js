import { studentsApi } from "./studentsApi";
import { apiSlice } from "../../app/api/apiSlice";
import { EVENTS } from "../../constants/events";

export function studentsRealtimeListeners(store) {
  return [
    {
      event: EVENTS.STUDENT_UPDATED,
      handler: (updatedStudent) => {
        store.dispatch(
          studentsApi.util.updateQueryData("getStudents", undefined, (draft) => {
            const idx = draft.findIndex((s) => s.id === updatedStudent.id);
            if (idx !== -1) draft[idx] = { ...draft[idx], ...updatedStudent };
          })
        );
      },
    },
    {
      event: EVENTS.STUDENT_CREATED,
      handler: (newStudent) => {
        store.dispatch(
          studentsApi.util.updateQueryData("getStudents", undefined, (draft) => {
            const exists = draft.some((s) => s.id === newStudent.id);
            if (!exists) draft.unshift(newStudent);
          })
        );
      },
    },
    {
      event: EVENTS.STUDENT_DELETED,
      handler: (studentId) => {
        store.dispatch(
          studentsApi.util.updateQueryData("getStudents", undefined, (draft) =>
            draft.filter((s) => s.id !== studentId)
          )
        );
      },
    },
    {
      event: EVENTS.STUDENT_METRICS_UPDATED,
      handler: ({ studentId, metrics }) => {
        store.dispatch(
          apiSlice.util.updateQueryData(
            "getStudentProfile", studentId,
            (draft) => {
              if (draft?.data) draft.data.metrics = metrics.metrics;
            }
          )
        );
      },
    },
  ];
}