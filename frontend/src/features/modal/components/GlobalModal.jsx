import { useDispatch, useSelector } from "react-redux";
import { closeModal }               from "../modalSlice";
import CreateStudentModal           from "../modals/CreateStudentModal";
import EditStudentModal             from "../modals/EditStudentModal";
import DeleteConfirmModal           from "../modals/DeleteConfirmModal";
import CreatePaymentModal           from "../modals/CreatePaymentModal";
import CreateIncidentModal          from "../modals/CreateIncidentModal";

export default function GlobalModal() {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector((s) => s.modal);

  if (!isOpen) return null;

  const renderModal = () => {
    switch (modalType) {
      case "createStudent":
      case "CREATE_STUDENT":
        return <CreateStudentModal {...modalProps} />;
      case "editStudent":
      case "EDIT_STUDENT":
        // 🔥 Pasa el student completo al modal
        return <EditStudentModal student={modalProps?.student} />;
      case "deleteConfirm":
      case "DELETE_CONFIRM":
        return <DeleteConfirmModal {...modalProps} />;
      case "createPayment":
      case "CREATE_PAYMENT":
        return <CreatePaymentModal {...modalProps} />;
      case "createIncident":
      case "CREATE_INCIDENT":
        return <CreateIncidentModal {...modalProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={() => dispatch(closeModal())} />
      <div className="relative z-10 animate-in fade-in zoom-in-95">
        {renderModal()}
      </div>
    </div>
  );
}