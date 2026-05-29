import SlideOverLayout from "../slide-over/SlideOverLayout";
import SlideOverHeader from "../slide-over/SlideOverHeader";
import SlideOverSection from "../slide-over/SlideOverSection";
import SlideOverBody from "../slide-over/SlideOverBody";
import SlideOverFooter from "../slide-over/SlideOverFooter";

const StudentMetricsSlideOver = ({
  entityId,
}) => {
  return (
    <SlideOverLayout
      header={
        <SlideOverHeader
          title="Student Metrics"
          subtitle={`Student ID: ${entityId}`}
        />
      }
      footer={
        <SlideOverFooter>
          <button
            className="
              rounded-xl
              border
              px-4
              py-2
              text-sm
              font-medium
            "
          >
            Export Report
          </button>

          <button
            className="
              rounded-xl
              bg-black
              px-4
              py-2
              text-sm
              font-medium
              text-white
            "
          >
            Edit Metrics
          </button>
        </SlideOverFooter>
      }
    >
      <SlideOverBody>
        <SlideOverSection title="Academic Performance">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border p-5">
              Average Grade
            </div>

            <div className="rounded-2xl border p-5">
              Attendance Rate
            </div>

            <div className="rounded-2xl border p-5">
              Assignments Completed
            </div>

            <div className="rounded-2xl border p-5">
              Risk Level
            </div>
          </div>
        </SlideOverSection>

        <SlideOverSection title="Performance Trends">
          <div className="rounded-2xl border p-6">
            Future charts here 😮‍💨🔥
          </div>
        </SlideOverSection>
      </SlideOverBody>
    </SlideOverLayout>
  );
};

export default StudentMetricsSlideOver;