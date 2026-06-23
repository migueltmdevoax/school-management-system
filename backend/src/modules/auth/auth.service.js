import db from "../../config/db.js";

export const findUserByEmail = async (email) => {
  const result = await db.query(
    `
    SELECT
      u.id,
      u.email,
      u.password_hash,
      u.role,
      t.id          AS teacher_id,
      t.first_name,
      t.last_name,
      p.id          AS parent_id
    FROM users u
    LEFT JOIN teachers t ON t.user_id = u.id
    LEFT JOIN parents  p ON p.user_id = u.id
    WHERE u.email = $1
    LIMIT 1
    `,
    [email]
  );
  return result.rows[0];
};