import { useDispatch } from "react-redux";
import { closeModal } from "../modalSlice";

export default function DeleteConfirmModal({
  title = "Delete item?",
  onConfirm,
}) {
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    dispatch(closeModal());
  };

  return (
    <div className="w-full max-w-md bg-gray-950 border border-red-900/50 rounded-3xl shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-8">This action cannot be undone.</p>
      <div className="flex justify-end gap-4">
        <button onClick={() => dispatch(closeModal())}
          className="px-5 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-700">
          Cancel
        </button>
        <button onClick={handleConfirm}
          className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold">
          Delete
        </button>
      </div>
    </div>
  );
}