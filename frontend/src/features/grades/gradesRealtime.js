import { apiSlice } from "../../app/api/apiSlice";

export function gradesRealtimeListeners(store) {
  return [
    {
      event: "grade_created",
      handler: () => {
        store.dispatch(
          apiSlice.util.invalidateTags(["Grades", "Dashboard"])
        );
      },
    },
  ];
}