import {
  startRealtimeManager
} from "./realtimeManager";

import {
  studentsRealtimeListeners,
} from "../features/students/studentsRealtime";

import {
  notificationsRealtimeListeners,
} from "../features/notifications/notificationsRealtime";

import {
  activityRealtimeListeners,
} from "../features/activity/activityRealtime";

import {
  dashboardRealtimeListeners,
} from "../features/dashboard/dashboardRealtime";

export function registerRealtime(
  store
) {

  startRealtimeManager([

    ...studentsRealtimeListeners(
      store
    ),

    ...notificationsRealtimeListeners(
      store
    ),

    ...activityRealtimeListeners(
      store
    ),

    ...dashboardRealtimeListeners(
      store
    ),

  ]);

}