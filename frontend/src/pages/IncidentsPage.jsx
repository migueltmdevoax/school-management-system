import { useState } from "react";
import { useIncidentsSocket } from "../hooks/useIncidentsSocket";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState([]);

  // 💥 AQUÍ SE ACTIVA SOCKET
  useIncidentsSocket(setIncidents);

  return (
    <div>
      <h1>🚨 Incidents</h1>

      {incidents.map((i) => (
        <div key={i.id}>
          {i.title}
        </div>
      ))}
    </div>
  );
}