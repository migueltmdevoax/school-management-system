import { io } from "socket.io-client";

let socket = null;



// 🟣 CONNECT SOCKET
export function connectSocket() {

  const token =
    localStorage.getItem("token");



  if (!token) {

    console.warn(
      "❌ No token for socket"
    );

    return null;
  }



  // 🔥 avoid duplicate connections
  if (socket?.connected) {

    return socket;
  }



  socket = io(
    "http://localhost:3000",
    {

      auth: {
        token,
      },

      transports: [
        "websocket",
      ],
    }
  );



  socket.on(
    "connect",
    () => {

      console.log(
        "🟢 Socket connected:",
        socket.id
      );
    }
  );



  socket.on(
    "disconnect",
    (reason) => {

      console.log(
        "🔴 Socket disconnected:",
        reason
      );
    }
  );



  socket.on(
    "connect_error",
    (error) => {

      console.error(
        "❌ Socket connection error:",
        error.message
      );
    }
  );



  return socket;
}





// 🟣 GET SOCKET
export function getSocket() {

  return socket;
}





// 🟣 DISCONNECT SOCKET
export function disconnectSocket() {

  if (socket) {

    socket.disconnect();

    socket = null;
  }
}