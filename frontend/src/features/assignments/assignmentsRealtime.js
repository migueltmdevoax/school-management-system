import { apiSlice } from "../../app/api/apiSlice";

export function assignmentsRealtimeListeners(store) {
  return [
    {
      event: "assignment_created",
      handler: () => {
        store.dispatch(
          apiSlice.util.invalidateTags(["Assignments", "Dashboard"])
        );
      },
    },
  ];
}