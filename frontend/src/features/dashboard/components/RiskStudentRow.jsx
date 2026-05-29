import RiskLevelBadge
from "./RiskLevelBadge";

export default function RiskStudentRow({

  student,

}) {

  return (

    <div className="
      flex
      items-center
      justify-between
      rounded-2xl
      border
      border-gray-800
      bg-gray-900/60
      p-4
    ">

      <div>

        <h4 className="
          font-semibold
          text-white
        ">

          {student.first_name}
          {" "}
          {student.last_name}

        </h4>





        <div className="
          mt-1
          flex
          gap-4
          text-sm
          text-gray-400
        ">

          <span>
            🚨 {student.incidents}
          </span>

          <span>
            💰 {student.pending_payments}
          </span>

          <span>
            📊 {student.average_grade}
          </span>

        </div>

      </div>





      <RiskLevelBadge
        level={student.risk}
      />

    </div>

  );

}