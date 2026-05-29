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

import slideOverReducer from "../features/slide-over/slideOverSlice";

import commandPaletteReducer
from "../features/command-palette/commandPaletteSlice";

import bulkSelectionReducer
from "../features/bulk-actions/bulkSelectionSlice";

import searchReducer
from "../features/search/searchSlice";

import globalSearchReducer
from "../features/global-search/globalSearchSlice";

import notificationsCenterReducer
from "../features/notifications-center/notificationsCenterSlice";



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

      slideOver: 
      slideOverReducer,

      commandPalette:
      commandPaletteReducer,

      bulkSelection:
      bulkSelectionReducer,

      search:
      searchReducer,

      globalSearch:
      globalSearchReducer,

      notificationsCenter:
      notificationsCenterReducer,
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