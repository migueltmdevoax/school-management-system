import db from "../../config/db.js";



// 🔥 GET ALL GROUPS
export const getAllGroups =
  async () => {

    const query = `

      SELECT
        id,
        name

      FROM groups

      ORDER BY name ASC

    `;

    const { rows } =
      await db.query(query);

    return rows;
  };