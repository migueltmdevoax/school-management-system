import {
  useDispatch,
} from "react-redux";

import {
  closeModal,
} from "../../modalSlice";



export default function CreateStudentModal() {

  const dispatch =
    useDispatch();



  return (

    <div className="
      w-full
      max-w-xl

      bg-gray-950

      border
      border-gray-800

      rounded-3xl

      shadow-2xl

      p-8
    ">

      {/* HEADER */}
      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <h2 className="
          text-2xl
          font-bold
          text-white
        ">

          Nuevo Alumno

        </h2>



        <button

          onClick={() =>
            dispatch(closeModal())
          }

          className="
            text-gray-400
            hover:text-white
          "
        >

          ✕

        </button>

      </div>





      {/* BODY */}
      <div className="
        flex
        flex-col
        gap-4
      ">

        <input
          placeholder="Nombre"
          className="
            bg-gray-900
            border
            border-gray-800

            rounded-xl

            p-3

            text-white
          "
        />



        <input
          placeholder="Apellido"
          className="
            bg-gray-900
            border
            border-gray-800

            rounded-xl

            p-3

            text-white
          "
        />

      </div>





      {/* FOOTER */}
      <div className="
        flex
        justify-end
        gap-4
        mt-8
      ">

        <button

          onClick={() =>
            dispatch(closeModal())
          }

          className="
            px-5
            py-3

            rounded-xl

            bg-gray-800
            text-white
          "
        >

          Cancelar

        </button>



        <button className="
          px-5
          py-3

          rounded-xl

          bg-blue-600
          hover:bg-blue-500

          text-white
          font-semibold
        ">

          Guardar

        </button>

      </div>

    </div>
  );
}