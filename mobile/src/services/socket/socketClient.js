import { io }          from "socket.io-client";
import AsyncStorage    from "@react-native-async-storage/async-storage";

const SOCKET_URL = "http://192.168.1.71:3000";

let socket = null;

export async function connectSocket() {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    console.warn("❌ No token for socket");
    return null;
  }

  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth:       { token },
    transports: ["websocket"],
    reconnection:        true,
    reconnectionAttempts: 5,
    reconnectionDelay:   1000,
  });

  socket.on("connect",       () => console.log("🟢 Socket connected:", socket.id));
  socket.on("disconnect",    (r) => console.log("🔴 Socket disconnected:", r));
  socket.on("connect_error", (e) => console.error("❌ Socket error:", e.message));

  return socket;
}

export function getSocket() { return socket; }

export function disconnectSocket() {
  if (socket) { socket.disconnect(); socket = null; }
}