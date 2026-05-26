import {
  useEffect
} from "react";

import {
  socket
} from "../../../services/socket/socketClient";



export default function
useStudentMetricsSocket(
  refetch
) {

  useEffect(() => {

    socket.on(
      "student_risk_updated",
      () => {

        refetch?.();
      }
    );



    socket.on(
      "incident_created",
      () => {

        refetch?.();
      }
    );



    socket.on(
      "payment_overdue",
      () => {

        refetch?.();
      }
    );



    return () => {

      socket.off(
        "student_risk_updated"
      );

      socket.off(
        "incident_created"
      );

      socket.off(
        "payment_overdue"
      );
    };

  }, [refetch]);
}