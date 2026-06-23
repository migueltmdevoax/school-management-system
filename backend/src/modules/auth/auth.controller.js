import bcrypt from "bcrypt";
import jwt    from "jsonwebtoken";
import { findUserByEmail } from "./auth.service.js";

// Tiempo mínimo de respuesta para prevenir timing attacks
const MIN_RESPONSE_TIME = 300;

export const login = async (req, res, next) => {
  const startTime = Date.now();

  const respond = (status, body) => {
    const elapsed = Date.now() - startTime;
    const delay   = Math.max(0, MIN_RESPONSE_TIME - elapsed);
    setTimeout(() => res.status(status).json(body), delay);
  };

  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return respond(400, { error: "Missing credentials" });
    }

    // Validar formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return respond(400, { error: "Invalid email format" });
    }

    // Limitar longitud de inputs
    if (email.length > 255 || password.length > 128) {
      return respond(400, { error: "Invalid credentials" });
    }

    const user = await findUserByEmail(email.toLowerCase().trim());

    // Si no existe el usuario, igual comparamos hash para evitar timing attack
    if (!user) {
      await bcrypt.compare(password, "$2b$10$invalidhashfortiminprotection123456789");
      return respond(401, { error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return respond(401, { error: "Invalid credentials" });
    }

    const payload = {
      id:         user.id,
      role:       user.role,
      email:      user.email,
      teacher_id: user.teacher_id || null,
      parent_id:  user.parent_id  || null,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    return respond(200, {
      token,
      user: {
        id:         user.id,
        email:      user.email,
        role:       user.role,
        teacher_id: user.teacher_id || null,
        parent_id:  user.parent_id  || null,
        first_name: user.first_name || null,
        last_name:  user.last_name  || null,
      },
    });
  } catch (error) {
    next(error);
  }
};