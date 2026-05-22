import bcrypt from "bcrypt";
import db from "../config/db.js";

async function hashUsers() {

  try {

    const result =
      await db.query(`
        SELECT id, password_hash
        FROM users
      `);

    for (const user of result.rows) {

      const hashedPassword =
        await bcrypt.hash(
          user.password_hash,
          10
        );

      await db.query(

        `
          UPDATE users
          SET password_hash = $1
          WHERE id = $2
        `,

        [
          hashedPassword,
          user.id
        ]
      );

      console.log(
        `✅ User updated: ${user.id}`
      );
    }

    console.log(
      "🔥 ALL PASSWORDS HASHED"
    );

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
}

hashUsers();