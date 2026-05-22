import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  findUserByEmail
} from "./auth.service.js";

export const login =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // 🔥 validations
      if (!email || !password) {

        return res.status(400).json({
          error: "Missing credentials"
        });
      }

      // 🔥 find user
      const user =
        await findUserByEmail(email);

      if (!user) {

        return res.status(401).json({
          error: "Invalid credentials"
        });
      }

      // 🔥 compare password
      const validPassword =
        await bcrypt.compare(
          password,
          user.password_hash
        );

      if (!validPassword) {

        return res.status(401).json({
          error: "Invalid credentials"
        });
      }

      // 🔥 JWT
      const token =
        jwt.sign(

          {
  id: user.id,

  role: user.role,

  email: user.email,

  teacher_id:
    user.teacher_id || null,

  parent_id:
    user.parent_id || null,
},

          process.env.JWT_SECRET,

          {
            expiresIn:
              process.env.JWT_EXPIRES_IN,
          }
        );

      // 🔥 response
      res.json({

        token,

        user: {

  id: user.id,

  email: user.email,

  role: user.role,

  teacher_id:
    user.teacher_id || null,

  parent_id:
    user.parent_id || null,

  first_name:
    user.first_name || null,

  last_name:
    user.last_name || null,

},
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: error.message
      });
    }
  };