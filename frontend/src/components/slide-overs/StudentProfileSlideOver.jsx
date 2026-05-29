import SlideOverLayout
from "../slide-over/SlideOverLayout";

import SlideOverHeader
from "../slide-over/SlideOverHeader";

import SlideOverSection
from "../slide-over/SlideOverSection";

import SlideOverBody
from "../slide-over/SlideOverBody";

import ActivityTimeline
from "../activity/ActivityTimeline";

import {
  useGetStudentProfileQuery
} from "../../features/students/studentsProfileApi";

import QuickActionsBar
from "../quick-actions/QuickActionsBar";

import CreateIncidentQuickAction
from "../quick-actions/CreateIncidentQuickAction";

import CreatePaymentQuickAction
from "../quick-actions/CreatePaymentQuickAction";

const StudentProfileSlideOver = ({
  entityId,
}) => {

  const {
    data,
    isLoading,
    isError,
  } = useGetStudentProfileQuery(
    entityId
  );

  if (isLoading) {

    return (
      <div className="p-6">
        Loading student profile...
      </div>
    );

  }

  if (isError || !data?.data) {

    return (
      <div className="p-6">
        Failed to load student profile
      </div>
    );

  }

  const student =
    data.data.student;

  const metrics =
    data.data.metrics;

  return (

    <SlideOverLayout

      header={

        <SlideOverHeader
          title={
            `${student.first_name}
            ${student.last_name}`
          }
          subtitle={student.email}
        />

      }

    >

      <SlideOverBody>

        {/* =====================================
            METRICS
        ===================================== */}

        <SlideOverSection title="Metrics">

          <div className="grid grid-cols-2 gap-4">

            <div
              className="
                rounded-2xl
                border
                p-5
              "
            >

              <p className="text-sm text-gray-500">
                Attendance
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                "
              >
                {metrics.attendanceRate}%
              </h3>

            </div>

            <div
              className="
                rounded-2xl
                border
                p-5
              "
            >

              <p className="text-sm text-gray-500">
                Average Grade
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                "
              >
                {metrics.averageGrade}
              </h3>

            </div>

            <div
              className="
                rounded-2xl
                border
                p-5
              "
            >

              <p className="text-sm text-gray-500">
                Incidents
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                "
              >
                {metrics.incidents}
              </h3>

            </div>

            <div
              className="
                rounded-2xl
                border
                p-5
              "
            >

              <p className="text-sm text-gray-500">
                Pending Payments
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                "
              >
                {metrics.pendingPayments}
              </h3>

            </div>

          </div>

        </SlideOverSection>






        <SlideOverSection
  title="Quick Actions"
>

  <QuickActionsBar>

    <CreateIncidentQuickAction
      studentId={entityId}
    />

    <CreatePaymentQuickAction
      studentId={entityId}
    />

  </QuickActionsBar>

</SlideOverSection>











        {/* =====================================
            ACTIVITY TIMELINE
        ===================================== */}

        <SlideOverSection
          title="Activity Timeline"
        >

          <ActivityTimeline
            entityType="student"
            entityId={entityId}
          />

        </SlideOverSection>

      </SlideOverBody>

    </SlideOverLayout>

  );

};

export default StudentProfileSlideOver;