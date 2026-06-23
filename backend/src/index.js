import server from "./server.js";

// 🔥 VALIDAR ENV VARS ANTES DE ARRANCAR
const required = [
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "DB_HOST",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  "DB_PORT",
  "FRONTEND_URL",
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error("❌ Missing required environment variables:");
  missing.forEach((key) => console.error(`   - ${key}`));
  console.error("🛑 Server startup aborted.");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔒 CORS origin: ${process.env.FRONTEND_URL}`);
});