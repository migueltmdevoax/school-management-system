import {
  createSlice,
} from "@reduxjs/toolkit";



const initialState = {

  notifications: [],
};




const notificationsSlice =
  createSlice({

    name: "notifications",

    initialState,

    reducers: {

      addNotification:
        (state, action) => {

          state.notifications
            .unshift({

              read: false,

              id:
                crypto.randomUUID(),

              createdAt:
                Date.now(),

              ...action.payload,
            });
        },



      removeNotification:
        (state, action) => {

          state.notifications =

            state.notifications
              .filter(

                notification =>

                  notification.id !==
                  action.payload
              );
        },



      clearNotifications:
        (state) => {

          state.notifications = [];
        },
    },

       markNotificationRead:
        (state, action) => {

       const notification =

       state.notifications.find(

        notification =>

        notification.id ===
        action.payload
    );



  if (notification) {

    notification.read = true;
  }
},
  });

       




export const {

  addNotification,

  removeNotification,

  clearNotifications,

  markNotificationRead,

} = notificationsSlice.actions;



export default
notificationsSlice.reducer;