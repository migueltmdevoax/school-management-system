import db from "../../config/db.js";

import {
  createActivityLog,
} from "../activity/activity.service.js";

import {

  emitIncidentCreated,

  emitStudentMetricsUpdated,

  emitDashboardUpdated,

} from "../../realtime/emitters.js";





// 🟣 CREATE INCIDENT
export async function createIncident({

  studentId,

  teacherId,

  title,

  description,

  severity,

}) {

  const result = await db.query(

    `
    INSERT INTO incidents (

      student_id,
      teacher_id,
      title,
      description,
      severity

    )

    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5
    )

    RETURNING *
    `,

    [

      studentId,

      teacherId,

      title,

      description,

      severity,

    ]

  );




  const incident =
    result.rows[0];





  /*
  |--------------------------------------------------------------------------
  | 🟣 ACTIVITY LOG
  |--------------------------------------------------------------------------
  */

  await createActivityLog({

    entityType:
      "student",

    entityId:
      studentId,

    action:
      "incident_created",

    title:
      "Incident registered",

    description:
      title,

    createdBy:
      teacherId,

    metadata: {

      severity,

      incidentId:
        incident.id,

    },

  });





  /*
  |--------------------------------------------------------------------------
  | 🟣 REALTIME
  |--------------------------------------------------------------------------
  */

  emitIncidentCreated({

    ...incident,

    studentId,

  });




  await emitStudentMetricsUpdated(
    studentId
  );




  await emitDashboardUpdated();





  return incident;

}





// 🟣 GET INCIDENTS BY STUDENT
export async function getIncidentsByStudent(
  studentId
) {

  const result = await db.query(

    `
    SELECT *
    FROM incidents

    WHERE student_id = $1

    ORDER BY created_at DESC
    `,

    [studentId]

  );




  return result.rows;

}