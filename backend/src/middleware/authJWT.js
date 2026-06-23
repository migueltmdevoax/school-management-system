import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Invalid token format" });
    }

    // Verificar que el token no sea anormalmente largo (previene ataques)
    if (token.length > 2048) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar que el payload tiene los campos mínimos requeridos
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ success: false, error: "Invalid token payload" });
    }

    // Verificar que el rol es válido
    const validRoles = ["admin", "teacher", "parent"];
    if (!validRoles.includes(decoded.role)) {
      return res.status(401).json({ success: false, error: "Invalid role in token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
    return res.status(403).json({ success: false, error: "Token verification failed" });
  }
};

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: error.errors,
    });
  }
};