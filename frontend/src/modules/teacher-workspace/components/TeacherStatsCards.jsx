export default function TeacherStatsCards({

  assignmentsCount,
  gradesCount,
  studentsCount,
  pendingCount,

}) {

  const cards = [

    {
      title: "Assignments",
      value: assignmentsCount,
      icon: "📚",
    },

    {
      title: "Grades",
      value: gradesCount,
      icon: "📝",
    },

    {
      title: "Students",
      value: studentsCount,
      icon: "🎓",
    },

    {
      title: "Pending",
      value: pendingCount,
      icon: "⏳",
    },

  ];



  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
    ">

      {cards.map((card) => (

        <div

          key={card.title}

          className="
            bg-gray-900
            border
            border-gray-800
            rounded-3xl
            p-6
          "
        >

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-gray-400
                text-sm
              ">
                {card.title}
              </p>

              <h2 className="
                text-4xl
                font-black
                text-white
                mt-2
              ">
                {card.value}
              </h2>

            </div>

            <div className="
              text-4xl
            ">
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}