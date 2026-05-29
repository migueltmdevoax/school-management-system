import SlideOverLayout from "../slide-over/SlideOverLayout";
import SlideOverHeader from "../slide-over/SlideOverHeader";
import SlideOverSection from "../slide-over/SlideOverSection";
import SlideOverBody from "../slide-over/SlideOverBody";
import SlideOverFooter from "../slide-over/SlideOverFooter";

const PaymentDetailsSlideOver = ({
  entityId,
}) => {
  return (
    <SlideOverLayout
      header={
        <SlideOverHeader
          title="Payment Details"
          subtitle={`Payment ID: ${entityId}`}
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
            Download Receipt
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
            Mark as Paid
          </button>
        </SlideOverFooter>
      }
    >
      <SlideOverBody>
        <SlideOverSection title="Payment Information">
          <div className="space-y-4">
            <div className="rounded-2xl border p-4">
              Amount
            </div>

            <div className="rounded-2xl border p-4">
              Payment Method
            </div>

            <div className="rounded-2xl border p-4">
              Due Date
            </div>

            <div className="rounded-2xl border p-4">
              Status
            </div>
          </div>
        </SlideOverSection>

        <SlideOverSection title="Payment Timeline">
          <div className="space-y-3">
            <div className="rounded-2xl border p-4">
              Payment created
            </div>

            <div className="rounded-2xl border p-4">
              Reminder sent
            </div>
          </div>
        </SlideOverSection>
      </SlideOverBody>
    </SlideOverLayout>
  );
};

export default PaymentDetailsSlideOver;