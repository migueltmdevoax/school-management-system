import {
  connectSocket,
} from "../services/socket/socketClient";



export function startRealtimeManager(
  listeners = []
) {

  console.log(
    "🟢 Realtime Manager Started"
  );



  // 🔥 CONNECT REAL SOCKET
  const socket =
    connectSocket();



  if (!socket) {

    console.warn(
      "❌ No socket available"
    );

    return;
  }



  listeners.forEach(
    ({ event, handler }) => {

      socket.on(
        event,
        handler
      );
    }
  );
}