import { X } from "lucide-react";
import { useSlideOver } from "../../hooks/useSlideOver";

const SlideOverHeader = ({ title, subtitle }) => {
  const { close } = useSlideOver();
  return (
    <div className="sticky top-0 z-10 border-b bg-white px-6 py-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        <button onClick={close} className="rounded-lg p-2 transition hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
export default SlideOverHeader;