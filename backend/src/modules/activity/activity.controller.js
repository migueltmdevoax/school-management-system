import db from "../../config/db.js";

export const getEntityActivity =
  async (req, res) => {

    try {

      const {
        entityType,
        entityId,
      } = req.params;

      const query = `

        SELECT *
        FROM activity_logs

        WHERE
          entity_type = $1
          AND entity_id = $2

        ORDER BY created_at DESC

        LIMIT 50

      `;

      const result =
        await db.query(query, [
          entityType,
          entityId,
        ]);

      return res.status(200).json({
        success: true,
        data: result.rows,
      });

    } catch (error) {

      console.error(
        "GET ENTITY ACTIVITY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch activity",
      });

    }

};