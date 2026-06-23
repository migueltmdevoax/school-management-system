import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../../../features/toast/toastSlice";
import { selectToasts } from "../../../features/toast/toastSelectors";
import ToastItem from "./ToastItem";

export default function ToastContainer() {
  const dispatch = useDispatch();
  const toasts = useSelector(selectToasts);

  return (
    <div className="fixed top-6 right-6 z-[99999] flex flex-col gap-4">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={(id) => dispatch(removeToast(id))}
        />
      ))}
    </div>
  );
}