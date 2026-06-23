import SlideOverLayout  from "../slide-over/SlideOverLayout";
import SlideOverHeader  from "../slide-over/SlideOverHeader";
import SlideOverSection from "../slide-over/SlideOverSection";
import SlideOverBody    from "../slide-over/SlideOverBody";

const IncidentDetailsSlideOver = ({ entityId }) => (
  <SlideOverLayout header={<SlideOverHeader title="Incident Details" subtitle={`ID: ${entityId}`} />}>
    <SlideOverBody>
      <SlideOverSection title="Incident Summary">
        <div className="space-y-4">
          {["Type","Severity","Teacher Notes","Date"].map((l) => (
            <div key={l} className="rounded-2xl border p-4"><p>{l}</p></div>
          ))}
        </div>
      </SlideOverSection>
    </SlideOverBody>
  </SlideOverLayout>
);

export default IncidentDetailsSlideOver;