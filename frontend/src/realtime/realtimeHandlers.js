import { studentsApi }
from "../features/students/studentsApi";

import {
  activityApi
} from "../features/activity/activityApi";

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




  // 🟣 ACTIVITY CREATED
  activity_created:
    (store, payload) => {

      const entityType =
        payload.entity_type;

      const entityId =
        payload.entity_id;

      store.dispatch(

        activityApi.util
          .updateQueryData(

            "getEntityActivity",

            {
              entityType,
              entityId,
            },

            (draft) => {

              if (!draft?.data)
                return;

              const exists =

                draft.data.some(
                  (item) =>
                    item.id === payload.id
                );

              if (exists)
                return;

              draft.data.unshift(
                payload
              );

            }

          )

      );

    },

};