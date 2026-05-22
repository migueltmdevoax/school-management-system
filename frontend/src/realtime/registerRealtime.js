import { startRealtimeManager }
from "./realtimeManager";

import {
  studentsRealtimeListeners,
} from "../features/students/studentsRealtime";

import {
  notificationsRealtimeListeners,
} from "../features/notifications/notificationsRealtime";



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

  ]);
}