import cors from "cors";

const devOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

const prodOrigins = [
  process.env.FRONTEND_URL,
].filter(Boolean);

const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigins;

export const corsOptions = {
  origin: (origin, callback) => {
    // Permite requests sin origin (mobile apps, Postman en dev)
    if (!origin) {
      if (process.env.NODE_ENV === "production") {
        callback(new Error("Not allowed by CORS"));
      } else {
        callback(null, true);
      }
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚫 CORS blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials:     true,
  methods:         ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders:  ["Content-Type","Authorization"],
  exposedHeaders:  ["X-Total-Count"],
  maxAge:          86400,
};

export default cors(corsOptions);