import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  closeModal,
} from "../modalSlice";



import CreateStudentModal
from "./modals/CreateStudentModal";

import DeleteConfirmModal
from "./modals/DeleteConfirmModal";



export default function GlobalModal() {

  const dispatch =
    useDispatch();



  const {

    isOpen,
    modalType,
    modalProps,

  } = useSelector(
    (state) => state.modal
  );



  if (!isOpen) {

    return null;
  }



  const renderModal = () => {

    switch (modalType) {

      case "createStudent":

        return (
          <CreateStudentModal
            {...modalProps}
          />
        );



      case "deleteConfirm":

        return (
          <DeleteConfirmModal
            {...modalProps}
          />
        );



      default:

        return null;
    }
  };



  return (

    <div className="
      fixed
      inset-0
      z-[999999]

      bg-black/60
      backdrop-blur-sm

      flex
      items-center
      justify-center

      p-4
    ">

      {/* 🔥 CLICK OUTSIDE */}
      <div

        className="
          absolute
          inset-0
        "

        onClick={() =>
          dispatch(closeModal())
        }
      />





      {/* 🔥 MODAL CONTENT */}
      <div className="
        relative
        z-10

        animate-in
        fade-in
        zoom-in-95
      ">

        {renderModal()}

      </div>

    </div>
  );
}