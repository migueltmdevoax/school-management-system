import db from "../../config/db.js";
import { createActivityLog }        from "../activity/activity.service.js";
import { notifyParentsOfIncident }  from "../notifications/notifications.service.js";
import {
  emitIncidentCreated,
  emitStudentMetricsUpdated,
  emitDashboardUpdated,
} from "../../realtime/emitters.js";

export async function create({ studentId, teacherId, title, description, severity }) {
  if (!studentId || !title) {
    throw new Error("studentId and title are required");
  }

  const validSeverities    = ["LOW", "MEDIUM", "HIGH"];
  const normalizedSeverity = severity?.toUpperCase() || "LOW";
  if (!validSeverities.includes(normalizedSeverity)) {
    throw new Error("severity must be LOW, MEDIUM or HIGH");
  }

  const { rows } = await db.query(
    `INSERT INTO incidents (student_id, teacher_id, title, description, severity)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [studentId, teacherId || null, title, description || null, normalizedSeverity]
  );

  const incident = rows[0];

  await createActivityLog({
    entityType:  "student",
    entityId:    studentId,
    action:      "incident_created",
    title:       "Incident registered",
    description: title,
    createdBy:   teacherId || null,
    metadata:    { severity: normalizedSeverity, incidentId: incident.id },
  });

  // 🔥 FIX: siempre notifica, sin importar la severidad.
  // El admin recibe siempre; el email a parents se filtra DENTRO de notifyParentsOfIncident.
  await notifyParentsOfIncident(studentId, title, normalizedSeverity);

  emitIncidentCreated({ ...incident, studentId });
  await emitStudentMetricsUpdated(studentId);
  await emitDashboardUpdated();

  return incident;
}

export const createIncident = create;

export async function getByTeacher(teacherId) {
  const { rows } = await db.query(
    `SELECT
       i.*,
       s.first_name, s.last_name,
       t.first_name AS teacher_first_name,
       t.last_name  AS teacher_last_name
     FROM incidents i
     JOIN students s ON s.id = i.student_id
     LEFT JOIN teachers t ON t.id = i.teacher_id
     WHERE i.teacher_id = $1
     ORDER BY i.created_at DESC`,
    [teacherId]
  );
  return rows;
}

export async function getAll() {
  const { rows } = await db.query(
    `SELECT
       i.*,
       s.first_name, s.last_name,
       t.first_name AS teacher_first_name,
       t.last_name  AS teacher_last_name
     FROM incidents i
     JOIN students s ON s.id = i.student_id
     LEFT JOIN teachers t ON t.id = i.teacher_id
     ORDER BY i.created_at DESC`
  );
  return rows;
}

export async function getIncidentsByStudent(studentId) {
  const { rows } = await db.query(
    `SELECT * FROM incidents WHERE student_id = $1 ORDER BY created_at DESC`,
    [studentId]
  );
  return rows;
}

export async function remove(incidentId) {
  const { rows } = await db.query(
    `DELETE FROM incidents WHERE id = $1 RETURNING *`,
    [incidentId]
  );
  if (!rows[0]) throw new Error("Incident not found");
  return rows[0];
}

export const deleteIncident = remove;