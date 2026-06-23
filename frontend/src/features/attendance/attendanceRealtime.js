import { getSocket } from "../../services/socket/socketClient";
import { attendanceApi } from "./attendanceApi";

export const registerAttendanceRealtime = (store) => {
  const socket = getSocket();
  if (!socket) return;

  socket.off("attendance:updated");
  socket.on("attendance:updated", () => {
    store.dispatch(attendanceApi.util.invalidateTags(["Attendance"]));
  });
};