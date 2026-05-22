import {
  useState,
} from "react";

import {
  useToast,
} from "../../../context/ToastContext";


export default function StudentActions({

  student,

  onDelete,

  onEdit,

}) {

  const [

    isEditing,

    setIsEditing,

  ] = useState(false);



  const [

    name,

    setName,

  ] = useState(
    student.name
  );



  const handleSave =
    async () => {

      try {

        await onEdit(
          student.id,
          {
            name,
          }
        );

        setIsEditing(false);

      } catch (err) {

        console.error(err);
      }
    };

    const { showToast } =
  useToast();



  const handleDelete =
  async () => {

    const confirmed =
      window.confirm(
        `¿Eliminar a ${student.name}?`
      );

    if (!confirmed) {
      return;
    }



    // 🟡 PENDING
    showToast(
      "⏳ Eliminando alumno...",
      "loading"
    );



    try {

      await onDelete(
        student.id
      );



      // 🟢 SUCCESS
      showToast(
        "✅ Alumno eliminado",
        "success"
      );

    } catch (err) {

      console.error(err);



      // 🔴 ERROR
      showToast(
        "❌ Error eliminando alumno",
        "error"
      );
    }
  };

    



  return (

    <div className="space-y-4">

      {/* 🟣 EDIT MODE */}
      {isEditing && (

        <div className="
          flex
          gap-2
        ">

          <input

            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            className="
              flex-1
              bg-gray-800
              text-white
              px-3
              py-2
              rounded-lg
              border
              border-gray-700
            "
          />



          <button

            onClick={handleSave}

            className="
              bg-green-600
              hover:bg-green-700
              transition-all
              text-white
              px-4
              rounded-lg
            "
          >
            Guardar
          </button>

        </div>
      )}



      {/* 🟣 ACTIONS */}
      <div className="
        flex
        gap-3
      ">

        {/* EDIT */}
        <button

          onClick={() =>
            setIsEditing(
              (prev) => !prev
            )
          }

          className="
            flex-1
            bg-blue-600
            hover:bg-blue-700
            transition-all
            text-white
            py-2
            rounded-lg
          "
        >

          {isEditing
            ? "Cancelar"
            : "Editar"}

        </button>



        {/* DELETE */}
        <button

          onClick={handleDelete}

          className="
            flex-1
            bg-red-600
            hover:bg-red-700
            transition-all
            text-white
            py-2
            rounded-lg
          "
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}