export const errorMiddleware = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV !== "production";

  // Log completo solo en desarrollo
  if (isDev) {
    console.error("GLOBAL ERROR:", {
      message: err.message,
      stack:   err.stack,
      path:    req.path,
      method:  req.method,
    });
  } else {
    // En producción solo logea lo mínimo sin datos sensibles
    console.error(`ERROR: ${req.method} ${req.path} — ${err.message}`);
  }

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ success: false, message: "CORS error" });
  }

  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details: isDev ? err.errors : "Invalid input data",
    });
  }

  // Errores de PostgreSQL — nunca exponer detalles en producción
  if (err.code === "23505") {
    return res.status(409).json({ success: false, message: "Duplicate entry" });
  }
  if (err.code === "23503") {
    return res.status(400).json({ success: false, message: "Referenced resource not found" });
  }
  if (err.code === "22P02") {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  const status  = err.status || err.statusCode || 500;

  // En producción nunca exponer el mensaje interno
  const message = isDev
    ? (err.message || "Internal server error")
    : status < 500 ? err.message : "Internal server error";

  return res.status(status).json({ success: false, message });
};