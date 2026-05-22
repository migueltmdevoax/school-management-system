import {
  addNotification,
} from "./notificationsSlice";



export function notificationsRealtimeListeners(
  store
) {

  return [

    // 🟣 INCIDENT CREATED
    {
      event: "incident_created",

      handler: (payload) => {

        store.dispatch(

          addNotification({

            type: "warning",

            title:
              "Nueva incidencia",

            message:
              payload.title ||
              "Incidente registrado",
          })
        );
      },
    },






    // 🟣 STUDENT RISK UPDATED
    {
      event:
        "student_risk_updated",

      handler: (payload) => {

        store.dispatch(

          addNotification({

            type: "error",

            title:
              "Alumno en riesgo",

            message:
              payload.studentName,
          })
        );
      },
    },
  ];
}