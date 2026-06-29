import Button
from "../../../components/ui/Button";



export default function GradeList({

  grades = [],
  onEdit,
  onDelete,

}) {

  if (!grades.length) {

    return (

      <p className="
        text-gray-400
      ">
        No se encontraron calificaciones
      </p>

    );
  }



  return (

    <div className="
      space-y-4
    ">

      {grades.map((grade) => (

        <div
          key={grade.id}
          className="
            bg-gray-900
            border
            border-gray-800
            rounded-2xl
            p-5
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h3 className="
              text-white
              font-bold
            ">
              {grade.assignment_title}
            </h3>

            <p className="
              text-gray-400
              text-sm
            ">
              Estudiante:
              {" "}
              {grade.student_name}
            </p>

          </div>



          <div className="
            flex
            items-center
            gap-3
          ">

            <span className="
              text-2xl
              font-black
              text-white
            ">
              {grade.grade}
            </span>



            <Button
              variant="ghost"
              onClick={() =>
                onEdit(grade)
              }
            >
              ✏️
            </Button>



            <Button
              variant="danger"
              onClick={() =>
                onDelete(grade.id)
              }
            >
              🗑
            </Button>

          </div>

        </div>

      ))}

    </div>
  );
}