import db from "../../config/db.js";

import {
  emitActivityCreated
} from "../../realtime/emitters.js";

export const createActivityLog =
  async ({
    entityType,
    entityId,
    action,
    title,
    description = "",
    createdBy = null,
    metadata = {},
  }) => {

    const query = `

      INSERT INTO activity_logs (

        entity_type,
        entity_id,
        action,
        title,
        description,
        created_by,
        metadata

      )

      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )

      RETURNING *

    `;

    const values = [

      entityType,
      entityId,
      action,
      title,
      description,
      createdBy,
      metadata,

    ];

    const result =
      await db.query(query, values);

    const activity =
      result.rows[0];



    emitActivityCreated(

      entityType,

      entityId,

      activity

    );



    return activity;

};