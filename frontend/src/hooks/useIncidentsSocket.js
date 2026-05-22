import { useEffect } from "react";
import { socket } from "../services/socket";

export const useIncidentsSocket = (setIncidents) => {
  useEffect(() => {
    socket.on("incident_created", (data) => {
      setIncidents((prev) => [data, ...prev]);
    });

    return () => socket.off("incident_created");
  }, []);
};

