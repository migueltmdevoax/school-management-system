import StudentProfileSlideOver from "../../components/slide-overs/StudentProfileSlideOver";
import StudentMetricsSlideOver from "../../components/slide-overs/StudentMetricsSlideOver";
import PaymentDetailsSlideOver from "../../components/slide-overs/PaymentDetailsSlideOver";
import IncidentDetailsSlideOver from "../../components/slide-overs/IncidentDetailsSlideOver";

export const slideOverRegistry = {
  "student-profile":  StudentProfileSlideOver,
  "student-metrics":  StudentMetricsSlideOver,
  "payment-details":  PaymentDetailsSlideOver,
  "incident-details": IncidentDetailsSlideOver,
  "STUDENT_PROFILE":  StudentProfileSlideOver,
  "STUDENT_METRICS":  StudentMetricsSlideOver,
  "PAYMENT_DETAILS":  PaymentDetailsSlideOver,
  "INCIDENT_DETAILS": IncidentDetailsSlideOver,
};