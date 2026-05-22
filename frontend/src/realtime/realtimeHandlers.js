import { studentsApi }
from "../features/students/studentsApi";

import {
  addNotification,
} from "../features/notifications/notificationsSlice";



export const realtimeHandlers = {

  // 🟣 STUDENT CREATED
  student_created:
    (store, payload) => {

      store.dispatch(

        studentsApi.util
          .updateQueryData(

            "getStudents",

            undefined,

            (draft) => {

              const exists =

                draft.some(
                  student =>
                    student.id === payload.id
                );

              if (!exists) {

                draft.unshift(
                  payload
                );
              }
            }
          )
      );
    },





  // 🟣 STUDENT UPDATED
  student_updated:
    (store, payload) => {

      store.dispatch(

        studentsApi.util
          .updateQueryData(

            "getStudents",

            undefined,

            (draft) => {

              const index =

                draft.findIndex(
                  student =>
                    student.id === payload.id
                );

              if (index !== -1) {

                draft[index] = {

                  ...draft[index],

                  ...payload,
                };
              }
            }
          )
      );
    },






  // 🟣 STUDENT DELETED
  student_deleted:
    (store, payload) => {

      store.dispatch(

        studentsApi.util
          .updateQueryData(

            "getStudents",

            undefined,

            (draft) => {

              return draft.filter(
                student =>
                  student.id !== payload.id
              );
            }
          )
      );
    },






  // 🟣 GLOBAL NOTIFICATIONS
  notification_created:
    (store, payload) => {

      store.dispatch(
        addNotification(payload)
      );
    },
};