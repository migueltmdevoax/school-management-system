export default function AttendanceStatCard({

  label,

  value,

  icon,

}) {

  return (

    <div className="
      rounded-2xl
      border
      border-gray-800
      bg-gray-900/60
      p-5
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <p className="
          text-sm
          text-gray-400
        ">

          {label}

        </p>





        <span className="
          text-xl
        ">

          {icon}

        </span>

      </div>





      <h3 className="
        mt-3
        text-3xl
        font-bold
        text-white
      ">

        {value}

      </h3>

    </div>

  );

}