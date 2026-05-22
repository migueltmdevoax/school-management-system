import { useEffect } from "react";

import { socket }
from "../../../services/socket";

export default function
useStudentMetricsSocket(
  setStudents
) {

  useEffect(() => {

    console.log(
      "🟢 Student metrics socket mounted"
    );



    // 🚨 RISK UPDATED
    socket.on(
      "student_risk_updated",

      (payload) => {

        console.log(
          "🚨 student_risk_updated",
          payload
        );

        setStudents(prev =>

          prev.map(student =>

            String(student.id)
            ===
            String(payload.studentId)

              ? {

                  ...student,

                  metrics: {

                    ...student.metrics,

                    average:
                      payload.average,

                    risk:
                      payload.risk,
                  },
                }

              : student
          )
        );
      }
    );



    // 🚨 INCIDENT CREATED
    socket.on(
      "incident_created",

      (payload) => {

        console.log(
          "🚨 incident_created",
          payload
        );

        setStudents(prev =>

          prev.map(student =>

            String(student.id)
            ===
            String(payload.studentId)

              ? {

                  ...student,

                  metrics: {

                    ...student.metrics,

                    incidents:
                      (
                        student.metrics
                          ?.incidents || 0
                      ) + 1,
                  },
                }

              : student
          )
        );
      }
    );



    // 🚨 PAYMENT OVERDUE
    socket.on(
      "payment_overdue",

      (payload) => {

        console.log(
          "💸 payment_overdue",
          payload
        );

        setStudents(prev =>

          prev.map(student =>

            String(student.id)
            ===
            String(payload.studentId)

              ? {

                  ...student,

                  metrics: {

                    ...student.metrics,

                    payments:
                      "OVERDUE",
                  },
                }

              : student
          )
        );
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

  }, [setStudents]);
}