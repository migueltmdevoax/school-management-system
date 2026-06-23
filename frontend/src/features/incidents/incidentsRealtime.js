import { apiSlice } from "../../app/api/apiSlice";

export function incidentsRealtimeListeners(store) {
  return [
    {
      event: "incident_created",
      handler: () => {
        store.dispatch(
          apiSlice.util.invalidateTags(["Incidents", "Dashboard"])
        );
      },
    },
  ];
}