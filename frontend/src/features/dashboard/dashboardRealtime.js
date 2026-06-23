import { dashboardApi } from "./dashboardApi";
import { EVENTS } from "../../constants/events";

export const dashboardRealtimeListeners = (store) => [
  {
    event: EVENTS.DASHBOARD_UPDATED,
    handler: (metrics) => {
      store.dispatch(
        dashboardApi.util.updateQueryData(
          "getDashboard",
          undefined,
          (draft) => { draft.data = metrics; }
        )
      );
    },
  },
];