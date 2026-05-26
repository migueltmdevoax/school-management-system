import {
  configureStore,
} from "@reduxjs/toolkit";



// 🟣 ROOT REDUCER
import rootReducer
  from "./rootReducer";



// 🟣 RTK QUERY
import {
  apiSlice,
} from "../app/api/apiSlice";



// 🟣 NOTIFICATIONS
import notificationsReducer
  from "../features/notifications/notificationsSlice";



// 🟣 TOAST
import toastReducer
  from "../features/toast/toastSlice";



// 🟣 REALTIME
import {
  registerRealtime,
} from "../realtime/registerRealtime";

import loadingReducer
from "../features/loading/loadingSlice";

import modalReducer
from "../features/modal/modalSlice";



// 🟣 STORE
export const store =
  configureStore({

    reducer: {

      // 🔥 APP REDUCERS
      ...rootReducer,



      // 🔥 RTK QUERY
      [apiSlice.reducerPath]:
        apiSlice.reducer,



      // 🔥 NOTIFICATIONS
      notifications:
        notificationsReducer,



      // 🔥 GLOBAL TOASTS
      toast:
        toastReducer,

      loading:
      loadingReducer, 

      modal:
      modalReducer,
    },





    middleware:
      (getDefaultMiddleware) =>

        getDefaultMiddleware({

          serializableCheck: false,

        }).concat(
          apiSlice.middleware
        ),





    devTools:
      import.meta.env.MODE !==
      "production",

  });





// 🟣 GLOBAL REALTIME REGISTRATION
registerRealtime(store);