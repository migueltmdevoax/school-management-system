import db from "../../config/db.js";

export const getConversation = async (userId1, userId2, studentId) => {
  const { rows } = await db.query(
    `SELECT m.*, 
            fu.email AS from_email,
            tu.email AS to_email
     FROM messages m
     JOIN users fu ON fu.id = m.from_user_id
     JOIN users tu ON tu.id = m.to_user_id
     WHERE m.student_id = $3
       AND ((m.from_user_id = $1 AND m.to_user_id = $2)
         OR (m.from_user_id = $2 AND m.to_user_id = $1))
     ORDER BY m.created_at ASC
     LIMIT 100`,
    [userId1, userId2, studentId]
  );
  return rows;
};

export const getMyConversations = async (userId) => {
  const { rows } = await db.query(
    `SELECT DISTINCT ON (
       LEAST(m.from_user_id::text, m.to_user_id::text) ||
       GREATEST(m.from_user_id::text, m.to_user_id::text) ||
       m.student_id::text
     )
     m.*,
     fu.email AS from_email,
     tu.email AS to_email,
     s.first_name AS student_first,
     s.last_name  AS student_last
     FROM messages m
     JOIN users fu ON fu.id = m.from_user_id
     JOIN users tu ON tu.id = m.to_user_id
     LEFT JOIN students s ON s.id = m.student_id
     WHERE m.from_user_id = $1 OR m.to_user_id = $1
     ORDER BY
       LEAST(m.from_user_id::text, m.to_user_id::text) ||
       GREATEST(m.from_user_id::text, m.to_user_id::text) ||
       m.student_id::text,
       m.created_at DESC`,
    [userId]
  );
  return rows;
};

export const send = async ({ fromUserId, toUserId, studentId, content }) => {
  const { rows } = await db.query(
    `INSERT INTO messages (from_user_id, to_user_id, student_id, content)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [fromUserId, toUserId, studentId || null, content]
  );
  return rows[0];
};

export const markRead = async (fromUserId, toUserId) => {
  await db.query(
    `UPDATE messages SET is_read = true
     WHERE from_user_id = $1 AND to_user_id = $2 AND is_read = false`,
    [fromUserId, toUserId]
  );
};