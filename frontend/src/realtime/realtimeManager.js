import { connectSocket } from "../services/socket/socketClient";

export function startRealtimeManager(listeners = []) {
  const socket = connectSocket();

  if (!socket) {
    console.warn("⚠️ Socket no disponible aún, reintentando en 1s...");
    setTimeout(() => startRealtimeManager(listeners), 1000);
    return;
  }

  listeners.forEach(({ event, handler }) => {
    socket.off(event); // evita duplicados
    socket.on(event, handler);
  });

  console.log("✅ Realtime listeners registrados:", listeners.length);
}