import {
  getIO,
} from "./socket.js";

import {
  EVENTS,
} from "./events.js";

import {
  getStudentMetrics,
} from "../modules/students/studentMetrics.service.js";





// 🟣 GENERIC ROOM EMITTER
export const emitToRoom = (

  room,

  event,

  payload

) => {

  const io = getIO();

  io.to(room).emit(

    event,

    payload
  );
};




// 🟣 GENERIC ROLE EMITTER
export const emitToRole = (

  role,

  event,

  payload

) => {

  const io = getIO();

  io.to(

    `role:${role}`

  ).emit(

    event,

    payload
  );
};




// 🟣 GENERIC USER EMITTER
export const emitToUser = (

  userId,

  event,

  payload

) => {

  const io = getIO();

  io.to(

    `user:${userId}`

  ).emit(

    event,

    payload
  );
};





// 🟣 INCIDENT CREATED
export const emitIncidentCreated = (
  incident
) => {

  // 🟣 padres
  emitToRoom(

    `parent:${incident.parentId}`,

    EVENTS.INCIDENT_CREATED,

    incident
  );



  // 🟣 alumno
  emitToRoom(

    `student:${incident.studentId}`,

    EVENTS.INCIDENT_CREATED,

    incident
  );



  // 🟣 admins
  emitToRole(

    "admin",

    EVENTS.INCIDENT_CREATED,

    incident
  );
};





// 🟣 STUDENT RISK UPDATED
export const emitStudentRiskUpdated =
(payload) => {

  console.log(
    "🔥 emitStudentRiskUpdated",
    payload
  );



  emitToRoom(

    `student:${payload.studentId}`,

    EVENTS.STUDENT_RISK_UPDATED,

    payload
  );



  emitToRoom(

    `parent:${payload.parentId}`,

    EVENTS.STUDENT_RISK_UPDATED,

    payload
  );



  emitToRole(

    "admin",

    EVENTS.STUDENT_RISK_UPDATED,

    payload
  );
};





// 🟣 STUDENT METRICS UPDATED
export const emitStudentMetricsUpdated =
async (studentId) => {

  const metrics =

    await getStudentMetrics(
      studentId
    );



  emitToRoom(

    `student:${studentId}`,

    EVENTS.STUDENT_METRICS_UPDATED,

    {
      studentId,
      metrics,
    }
  );



  emitToRole(

    "admin",

    EVENTS.STUDENT_METRICS_UPDATED,

    {
      studentId,
      metrics,
    }
  );



  console.log(
    "🔥 student_metrics_updated emitted"
  );
};