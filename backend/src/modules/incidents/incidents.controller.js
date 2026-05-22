import * as service from "./incidents.service.js";
import { notifyParentsOfIncident } from "../notifications/notifications.service.js";
import { emitIncidentCreated } from "../../realtime/emitters.js";

export async function createIncident(req, res) {
  try {
    const incident = await service.createIncident(req.body);

    if (incident.severity === "HIGH") {
      await notifyParentsOfIncident(
        incident.studentId,
        incident.title
      );
    }

    emitIncidentCreated(incident);

    res.json(incident);

  } catch (error) {
    res.status(500).json({ error: "Error creating incident" });
  }
}

export async function getIncidentsByStudent(req, res) {
  try {
    const { id } = req.params;

    const incidents = await service.getIncidentsByStudent(id);

    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching incidents" });
  }
}