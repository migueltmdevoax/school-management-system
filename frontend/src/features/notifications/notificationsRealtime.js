import { apiSlice }          from "../../app/api/apiSlice";
import { addToast }          from "../toast/toastSlice";

export function notificationsRealtimeListeners(store) {
  return [
    {
      event: "notification_created",
      handler: (payload) => {
        // 🔥 Invalida cache — fuerza refetch inmediato
        store.dispatch(
          apiSlice.util.invalidateTags(["Notifications"])
        );

        // 🔥 Toast inmediato para feedback visual
        store.dispatch(addToast({
          type:     payload.type === "incident" ? "error" :
                    payload.type === "payment"  ? "warning" : "info",
          title:    payload.title   || "Nueva notificación",
          message:  payload.message || "",
          duration: 5000,
        }));
      },
    },
  ];
}