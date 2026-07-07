import db from "../../config/db.js";

export const getConfig = async () => {
  const { rows } = await db.query(
    `SELECT * FROM school_config ORDER BY created_at ASC`
  );
  return rows;
};

export const getConfigById = async (id) => {
  const { rows } = await db.query(
    `SELECT * FROM school_config WHERE id = $1`, [id]
  );
  return rows[0];
};

export const updateConfig = async (id, { school_name, school_type, features }) => {
  const { rows } = await db.query(
    `UPDATE school_config
     SET school_name = COALESCE($1, school_name),
         school_type = COALESCE($2, school_type),
         features    = COALESCE($3, features)
     WHERE id = $4 RETURNING *`,
    [school_name, school_type, features ? JSON.stringify(features) : null, id]
  );
  return rows[0];
};