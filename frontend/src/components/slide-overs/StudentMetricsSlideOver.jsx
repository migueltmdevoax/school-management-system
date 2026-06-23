import { useState }              from "react";
import { useGetStudentsQuery }   from "../../features/students/studentsApi";
import { useGetStudentProfileQuery } from "../../features/students/studentsProfileApi";
import SlideOverLayout  from "../slide-over/SlideOverLayout";
import SlideOverHeader  from "../slide-over/SlideOverHeader";
import SlideOverSection from "../slide-over/SlideOverSection";
import SlideOverBody    from "../slide-over/SlideOverBody";

const StudentMetricsSlideOver = ({ entityId }) => {
  const [selectedId, setSelectedId] = useState(entityId);

  const { data: studentsData = [] } = useGetStudentsQuery();
  const { data, isLoading, isError } = useGetStudentProfileQuery(selectedId, {
    skip: !selectedId,
  });

  const profile = data?.data;
  const student = profile?.student;
  const metrics = profile?.metrics;

  const riskColor = {
    high:   "text-red-400 bg-red-500/10 border-red-500/30",
    medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    low:    "text-green-400 bg-green-500/10 border-green-500/30",
  };

  if (!selectedId) {
    return (
      <SlideOverLayout header={<SlideOverHeader title="Student Metrics" subtitle="Select a student" />}>
        <SlideOverBody>
          <SlideOverSection title="Choose a student">
            <div className="space-y-2">
              {studentsData.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className="w-full text-left rounded-2xl border border-gray-800 bg-gray-900 p-4 hover:bg-gray-800 transition"
                >
                  <p className="text-white font-medium">{s.first_name} {s.last_name}</p>
                  <p className="text-gray-500 text-sm mt-1">{s.email || "No email"}</p>
                </button>
              ))}
            </div>
          </SlideOverSection>
        </SlideOverBody>
      </SlideOverLayout>
    );
  }

  return (
    <SlideOverLayout
      header={
        <SlideOverHeader
          title="Student Metrics"
          subtitle={student ? `${student.first_name} ${student.last_name}` : "Loading..."}
        />
      }
    >
      <SlideOverBody>
        {isLoading && (
          <div className="p-6 text-center text-gray-400">Loading metrics...</div>
        )}

        {isError && (
          <div className="p-6 text-center text-red-400">Error loading student metrics</div>
        )}

        {profile && (
          <SlideOverSection title="Academic Performance">
            <button
              onClick={() => setSelectedId(null)}
              className="mb-4 text-blue-400 hover:text-blue-300 text-sm"
            >
              ← Choose another student
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                <p className="text-gray-500 text-xs uppercase tracking-wide">Average Grade</p>
                <h3 className="text-white text-2xl font-bold mt-2">
                  {metrics?.average ?? 0}
                </h3>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                <p className="text-gray-500 text-xs uppercase tracking-wide">Attendance Rate</p>
                <h3 className="text-white text-2xl font-bold mt-2">
                  {metrics?.attendanceRate ?? 0}%
                </h3>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                <p className="text-gray-500 text-xs uppercase tracking-wide">Incidents</p>
                <h3 className="text-white text-2xl font-bold mt-2">
                  {metrics?.incidents ?? 0}
                </h3>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                <p className="text-gray-500 text-xs uppercase tracking-wide">Pending Payments</p>
                <h3 className="text-white text-2xl font-bold mt-2">
                  {metrics?.pendingPayments ?? 0}
                </h3>
              </div>
            </div>

            <div className={`mt-4 rounded-2xl border p-5 ${riskColor[metrics?.risk] || riskColor.low}`}>
              <p className="text-xs uppercase tracking-wide opacity-70">Risk Level</p>
              <h3 className="text-2xl font-bold mt-2 capitalize">
                {metrics?.risk || "low"}
              </h3>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email</span>
                <span className="text-white">{student?.email || "—"}</span>
              </div>
            </div>
          </SlideOverSection>
        )}
      </SlideOverBody>
    </SlideOverLayout>
  );
};

export default StudentMetricsSlideOver;