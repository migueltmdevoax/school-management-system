import { useEffect } from "react";
import { socket } from "../services/socket";

export const useRiskSocket = (setRiskAlert) => {

  useEffect(() => {

    console.log("🟢 useRiskSocket mounted");

    socket.on("connect", () => {
      console.log("🔥 SOCKET CONNECTED", socket.id);
    });

    socket.on("student_risk_updated", (data) => {

      console.log("🚨 RISK UPDATE RECEIVED", data);

      setRiskAlert(data);
    });

    return () => {

      socket.off("student_risk_updated");

    };

  }, []);
};