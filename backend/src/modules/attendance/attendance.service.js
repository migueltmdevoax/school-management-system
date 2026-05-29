import db from "../../config/db.js";

import {
  createActivityLog,
} from "../activity/activity.service.js";

import {
  emitStudentMetricsUpdated,
} from "../../realtime/emitters.js";

import {
  emitAttendanceUpdated,
} from "../../realtime/emitters.js";



// 🟣 MARK ATTENDANCE
export const markAttendance =
async ({

  studentId,
  status,
  date,
  createdBy,

}) => {

  const result =
    await db.query(

      `
      INSERT INTO attendance (

        student_id,
        status,
        attendance_date,
        created_by

      )

      VALUES (
        $1,
        $2,
        $3,
        $4
      )

      RETURNING *
      `,

      [
        studentId,
        status,
        date,
        createdBy,
      ]

    );



  const attendance =
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
      "attendance_marked",

    title:
      "Attendance marked",

    description:
      `Attendance status: ${status}`,

    createdBy,

    metadata: {

      attendanceId:
        attendance.id,

      status,

    },

  });



  /*
  |--------------------------------------------------------------------------
  | 🟣 REALTIME METRICS
  |--------------------------------------------------------------------------
  */

  await emitStudentMetricsUpdated(
    studentId
  );

  emitAttendanceUpdated(
  studentId,
  attendance
);



  return attendance;

};





// 🟣 GET STUDENT ATTENDANCE
export const getAttendanceByStudent =
async (studentId) => {

  const result =
    await db.query(

      `
      SELECT *

      FROM attendance

      WHERE student_id = $1

      ORDER BY attendance_date DESC
      `,

      [studentId]

    );



  return result.rows;

};