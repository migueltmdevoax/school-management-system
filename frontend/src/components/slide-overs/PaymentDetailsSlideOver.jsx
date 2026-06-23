import SlideOverLayout  from "../slide-over/SlideOverLayout";
import SlideOverHeader  from "../slide-over/SlideOverHeader";
import SlideOverSection from "../slide-over/SlideOverSection";
import SlideOverBody    from "../slide-over/SlideOverBody";

const PaymentDetailsSlideOver = ({ entityId }) => (
  <SlideOverLayout header={<SlideOverHeader title="Payment Details" subtitle={`ID: ${entityId}`} />}>
    <SlideOverBody>
      <SlideOverSection title="Payment Information">
        <div className="space-y-4">
          {["Amount","Status","Due Date","Student"].map((l) => (
            <div key={l} className="rounded-2xl border p-4"><p>{l}</p></div>
          ))}
        </div>
      </SlideOverSection>
    </SlideOverBody>
  </SlideOverLayout>
);

export default PaymentDetailsSlideOver;