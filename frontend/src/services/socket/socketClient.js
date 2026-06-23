import { io } from "socket.io-client";

let socket = null;

export function connectSocket() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("❌ No token for socket");
    return null;
  }
  if (socket?.connected) return socket;

  socket = io(import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:3000", {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => console.log("🟢 Socket connected:", socket.id));
  socket.on("disconnect", (reason) => console.log("🔴 Socket disconnected:", reason));
  socket.on("connect_error", (error) => console.error("❌ Socket error:", error.message));

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export { socket };