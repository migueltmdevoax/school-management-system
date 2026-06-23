import SlideOverLayout  from "../slide-over/SlideOverLayout";
import SlideOverHeader  from "../slide-over/SlideOverHeader";
import SlideOverSection from "../slide-over/SlideOverSection";
import SlideOverBody    from "../slide-over/SlideOverBody";
import { useGetStudentProfileQuery } from "../../features/students/studentsProfileApi";

const StudentProfileSlideOver = ({ entityId }) => {
  const { data, isLoading, isError } = useGetStudentProfileQuery(entityId, { skip: !entityId });

  if (isLoading) return <div className="p-6 text-white">Loading profile...</div>;
  if (isError || !data?.data) return <div className="p-6 text-red-400">Failed to load profile</div>;

  const { student, metrics } = data.data;

  return (
    <SlideOverLayout header={
      <SlideOverHeader title={`${student.first_name} ${student.last_name}`} subtitle={student.email} />
    }>
      <SlideOverBody>
        <SlideOverSection title="Metrics">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Attendance",       value: `${metrics.attendanceRate}%` },
              { label: "Average Grade",    value: metrics.average },
              { label: "Incidents",        value: metrics.incidents },
              { label: "Pending Payments", value: metrics.pendingPayments },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500">{m.label}</p>
                <h3 className="mt-2 text-2xl font-bold">{m.value}</h3>
              </div>
            ))}
          </div>
        </SlideOverSection>
      </SlideOverBody>
    </SlideOverLayout>
  );
};

export default StudentProfileSlideOver;