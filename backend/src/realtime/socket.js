let io;

export const initSocket = (instance) => {
  io = instance;
};

export const getIO = () => {
  if (!io) throw new Error("❌ Socket not initialized");
  return io;
};