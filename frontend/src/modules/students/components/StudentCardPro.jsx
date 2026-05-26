// 🔥 StudentCardPro.jsx

import StudentActions from "./StudentActions";

export default function StudentCardPro({
  student,
  onEdit,
  onDelete,
  onView,
  onAssignment,
  onIncident,
}) {

  const riskConfig = {
    high: {
      label: "🔴 High Risk",
      border: "border-red-500/30",
      badge: "bg-red-500/20 text-red-300",
      progress: "bg-red-500",
    },

    medium: {
      label: "🟡 Attention",
      border: "border-yellow-500/30",
      badge: "bg-yellow-500/20 text-yellow-300",
      progress: "bg-yellow-500",
    },

    low: {
      label: "🟢 Excellent",
      border: "border-green-500/20",
      badge: "bg-green-500/20 text-green-300",
      progress: "bg-blue-500",
    },
  };

  const config =
    riskConfig[student.riskLevel] ||
    riskConfig.low;

  return (

    <div
      className={`
        bg-gray-900
        border
        ${config.border}
        rounded-3xl
        p-6
        shadow-xl
        transition-all
        hover:scale-[1.01]
      `}
    >

      {/* 🔥 HEADER */}
      <div className="
        flex
        items-start
        justify-between
        gap-4
      ">

        <div>

          <h2 className="
            text-2xl
            font-black
            text-white
          ">
            {student.name}
          </h2>

          <p className="
            text-gray-500
            text-sm
            mt-1
          ">
            Student ID: {student.id}
          </p>

        </div>

        <div
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-bold
            ${config.badge}
          `}
        >
          {config.label}
        </div>

      </div>

      {/* 🔥 METRICS */}
      <div className="
        grid
        grid-cols-3
        gap-4
        mt-6
      ">

        <Metric
          title="Average"
          value={student.average?.toFixed(1) || "0.0"}
        />

        <Metric
          title="Progress"
          value={`${student.progress || 0}%`}
        />

        <Metric
          title="Assignments"
          value={student.totalGrades || 0}
        />

      </div>

      {/* 🔥 PROGRESS BAR */}
      <div className="mt-6">

        <div className="
          flex
          justify-between
          text-sm
          mb-2
        ">

          <span className="text-gray-400">
            Academic Progress
          </span>

          <span className="text-white">
            {student.progress || 0}%
          </span>

        </div>

        <div className="
          w-full
          h-3
          bg-gray-800
          rounded-full
          overflow-hidden
        ">

          <div
            className={`
              h-full
              rounded-full
              transition-all
              ${config.progress}
            `}
            style={{
              width: `${student.progress || 0}%`,
            }}
          />

        </div>

      </div>

      {/* 🔥 LAST GRADES */}
      <div className="
        mt-6
        space-y-2
      ">

        {student.grades?.length > 0 ? (

          student.grades
            .slice(0, 4)
            .map((grade) => (

              <div
                key={grade.id}
                className="
                  bg-gray-800
                  rounded-2xl
                  px-4
                  py-3
                  flex
                  justify-between
                  items-center
                "
              >

                <span className="text-gray-300">
                  {grade.assignment_title}
                </span>

                <span className="
                  text-white
                  font-black
                ">
                  {grade.grade}
                </span>

              </div>

            ))

        ) : (

          <div className="
            bg-gray-800
            rounded-2xl
            p-4
            text-gray-500
          ">
            No grades registered
          </div>

        )}

      </div>

      {/* 🔥 ACTIONS */}
      <StudentActions
        student={student}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
        onAssignment={onAssignment}
        onIncident={onIncident}
      />

    </div>

  );
}

function Metric({
  title,
  value,
}) {

  return (

    <div className="
      bg-gray-800
      rounded-2xl
      p-4
    ">

      <p className="
        text-gray-400
        text-xs
      ">
        {title}
      </p>

      <h3 className="
        text-white
        text-xl
        font-black
        mt-1
      ">
        {value}
      </h3>

    </div>

  );
}