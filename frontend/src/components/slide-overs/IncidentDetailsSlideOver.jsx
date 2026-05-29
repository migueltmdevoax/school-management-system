import SlideOverLayout from "../slide-over/SlideOverLayout";
import SlideOverHeader from "../slide-over/SlideOverHeader";
import SlideOverSection from "../slide-over/SlideOverSection";
import SlideOverBody from "../slide-over/SlideOverBody";
import SlideOverFooter from "../slide-over/SlideOverFooter";

const IncidentDetailsSlideOver = ({
  entityId,
}) => {
  return (
    <SlideOverLayout
      header={
        <SlideOverHeader
          title="Incident Details"
          subtitle={`Incident ID: ${entityId}`}
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
            Notify Parent
          </button>

          <button
            className="
              rounded-xl
              bg-red-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
            "
          >
            Resolve Incident
          </button>
        </SlideOverFooter>
      }
    >
      <SlideOverBody>
        <SlideOverSection title="Incident Summary">
          <div className="space-y-4">
            <div className="rounded-2xl border p-4">
              Incident Type
            </div>

            <div className="rounded-2xl border p-4">
              Severity
            </div>

            <div className="rounded-2xl border p-4">
              Teacher Notes
            </div>
          </div>
        </SlideOverSection>

        <SlideOverSection title="Timeline">
          <div className="space-y-3">
            <div className="rounded-2xl border p-4">
              Incident created
            </div>

            <div className="rounded-2xl border p-4">
              Parent notified
            </div>
          </div>
        </SlideOverSection>
      </SlideOverBody>
    </SlideOverLayout>
  );
};

export default IncidentDetailsSlideOver;