import db from "../../config/db.js";

export const getAllPayments = async () => {
  const { rows } = await db.query(`
    SELECT p.*, s.first_name, s.last_name
    FROM payments p
    JOIN students s ON s.id = p.student_id
    ORDER BY p.created_at DESC
  `);
  return rows;
};

export const getPaymentsByParent = async (parentId) => {
  const { rows } = await db.query(`
    SELECT p.*, s.first_name, s.last_name
    FROM payments p
    JOIN students s ON s.id = p.student_id
    JOIN parent_students ps ON ps.student_id = s.id
    WHERE ps.parent_id = $1
    ORDER BY p.created_at DESC
  `, [parentId]);
  return rows;
};

export const createPayment = async ({ studentId, amount, dueDate }) => {
  const { rows } = await db.query(`
    INSERT INTO payments (student_id, amount, status, due_date)
    VALUES ($1, $2, 'PENDING', $3)
    RETURNING *
  `, [studentId, amount, dueDate || null]);
  return rows[0];
};

// 🔥 FIX: transacción atómica — protege contra doble-click y concurrencia
export const markAsPaid = async (id) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `UPDATE payments
       SET status = 'PAID', paid_at = NOW(), updated_at = NOW()
       WHERE id = $1 AND status != 'PAID'
       RETURNING *`,
      [id]
    );
    if (rows.length === 0) {
      await client.query("ROLLBACK");
      throw new Error("Payment already marked as paid or not found");
    }
    await client.query("COMMIT");
    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const deletePayment = async (id) => {
  const { rows } = await db.query(`
    DELETE FROM payments WHERE id = $1 RETURNING *
  `, [id]);
  if (!rows[0]) throw new Error("Payment not found");
  return rows[0];
};