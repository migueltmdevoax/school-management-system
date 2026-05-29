import socket
from "../../services/socket";

import {
  attendanceApi,
} from "./attendanceApi";

export const registerAttendanceRealtime =
(store) => {

  socket.on(

    "attendance:updated",

    (payload) => {

      store.dispatch(

        attendanceApi.util
          .invalidateTags([

            "ATTENDANCE",

          ])

      );

    }

  );

};