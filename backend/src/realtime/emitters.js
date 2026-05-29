import {
  getIO,
} from "./socket.js";

import {
  EVENTS,
} from "./events.js";

import {
  getStudentMetrics,
} from "../modules/students/students.metrics.service.js";

import {
  getDashboardMetrics,
} from "../modules/dashboard/dashboard.service.js";




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




// 🔔 NOTIFICATION CREATED
export const emitNotificationCreated =
(

  userId,
  notification

) => {

  emitToUser(

    userId,

    EVENTS.NOTIFICATION_CREATED,

    notification
  );
};




// 🚨 INCIDENT CREATED
export const emitIncidentCreated = (
  incident
) => {

  emitToRoom(

    `parent:${incident.parentId}`,

    EVENTS.INCIDENT_CREATED,

    incident
  );



  emitToRoom(

    `student:${incident.studentId}`,

    EVENTS.INCIDENT_CREATED,

    incident
  );



  emitToRole(

    "admin",

    EVENTS.INCIDENT_CREATED,

    incident
  );
};




// ⚠️ STUDENT RISK UPDATED
export const emitStudentRiskUpdated =
(payload) => {

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




// 📊 STUDENT METRICS UPDATED
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

};




// 🟣 ACTIVITY CREATED
export const emitActivityCreated = (

  entityType,

  entityId,

  activity

) => {

  emitToRoom(

    `${entityType}:${entityId}`,

    EVENTS.ACTIVITY_CREATED,

    activity

  );



  emitToRole(

    "admin",

    EVENTS.ACTIVITY_CREATED,

    activity
  );

};


 //DASHBOARD

 export const emitDashboardUpdated =
async () => {

  const metrics =

    await getDashboardMetrics();




  emitToRole(

    "admin",

    EVENTS.DASHBOARD_UPDATED,

    metrics

  );




  console.log(
    "🔥 dashboard_updated emitted"
  );

};


export const emitAttendanceUpdated =
(studentId, attendance) => {

  global.io.emit(

    "attendance:updated",

    {

      studentId,

      attendance,

    }

  );

};