const KpiCard = ({

  title,

  value,

  icon,

  trend,

  trendLabel,

}) => {

  return (

    <div
      className="
        rounded-3xl
        border
        border-gray-800
        bg-gray-900
        p-6
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              text-gray-400
            "
          >

            {title}

          </p>




          <h2
            className="
              mt-3
              text-4xl
              font-bold
              text-white
            "
          >

            {value}

          </h2>

        </div>





        <div
          className="
            rounded-2xl
            bg-gray-800
            p-3
            text-2xl
          "
        >

          {icon}

        </div>

      </div>





      {/* FOOTER */}
      <div
        className="
          mt-6
          flex
          items-center
          gap-2
        "
      >

        {

          trend && (

            <span
              className={`
                rounded-full
                px-2
                py-1
                text-xs
                font-medium

                ${
                  trend === "arriba"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }
              `}
            >

              {
                trend === "arriba"
                  ? "↑"
                  : "↓"
              }

            </span>

          )

        }




        <p
          className="
            text-sm
            text-gray-400
          "
        >

          {trendLabel}

        </p>

      </div>

    </div>

  );

};

export default
KpiCard;