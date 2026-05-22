import StudentAvatar
from "./StudentAvatar";

import StudentBadges
from "./StudentBadges";

import StudentMetrics
from "./StudentMetrics";

import StudentProgress
from "./StudentProgress";

import StudentActions
from "./StudentActions";



export default function StudentCardPro({

  student,

  onDelete,

  onEdit,

}) {

  const metrics =
    student.metrics || {};



  return (

    <div className="
      bg-gray-900
      rounded-2xl
      p-5
      shadow-xl
      border border-gray-800
      hover:border-blue-500
      hover:scale-[1.01]
      transition-all
      duration-300
    ">

      {/* 🟣 TOP */}
      <div className="
        flex
        items-center
        justify-between
      ">

        <div className="
          flex
          items-center
          gap-4
        ">

          <StudentAvatar
            name={student.name}
          />

          <div>

            <h2 className="
              text-white
              text-lg
              font-bold
            ">
              {student.name}
            </h2>

            <p className="
    text-gray-400
    text-sm
  ">
    ID: {student.id}
  </p>

  {student.status ===
    "syncing" && (

    <p className="
      text-yellow-400
      text-xs
      mt-1
    ">
      ⏳ Sincronizando...
    </p>
  )}

          </div>

        </div>



        <StudentBadges
          average={metrics.average}
          risk={metrics.risk}
        />

      </div>



      {/* 🟣 METRICS */}
      <div className="mt-5">

        <StudentMetrics
          average={metrics.average}
          incidents={metrics.incidents}
          payments={metrics.pendingPayments}
        />

      </div>



      {/* 🟣 PROGRESS */}
      <div className="mt-5">

        <StudentProgress
          progress={metrics.progress}
        />

      </div>



      {/* 🟣 ACTIONS */}
      <div className="mt-6">

        <StudentActions

          student={student}

          onDelete={onDelete}

          onEdit={onEdit}
        />

      </div>

    </div>
  );
}