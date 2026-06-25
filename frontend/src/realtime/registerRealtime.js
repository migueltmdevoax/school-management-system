import { startRealtimeManager }           from "./realtimeManager";
import { studentsRealtimeListeners }      from "../features/students/studentsRealtime";
import { notificationsRealtimeListeners } from "../features/notifications/notificationsRealtime";
import { activityRealtimeListeners }      from "../features/activity/activityRealtime";
import { dashboardRealtimeListeners }     from "../features/dashboard/dashboardRealtime";
import { incidentsRealtimeListeners }     from "../features/incidents/incidentsRealtime";
import { gradesRealtimeListeners }        from "../features/grades/gradesRealtime";
import { assignmentsRealtimeListeners } from "../features/assignments/assignmentsRealtime";


let realtimeRegistered = false;

export function registerRealtime(store) {
  if (realtimeRegistered) return;
  realtimeRegistered = true;

  startRealtimeManager([
    ...studentsRealtimeListeners(store),
    ...notificationsRealtimeListeners(store),
    ...activityRealtimeListeners(store),
    ...dashboardRealtimeListeners(store),
    ...incidentsRealtimeListeners(store),      // 🔥 nuevo
    ...gradesRealtimeListeners(store),         // 🔥 nuevo
    ...assignmentsRealtimeListeners(store),    // 🔥 nuevo
  ]);
}