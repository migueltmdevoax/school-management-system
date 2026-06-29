export default function AttendanceCard({

  attendance,

}) {

  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-950
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <h3 className="
            text-lg
            font-bold
            text-white
          ">

            Asistencia

          </h3>





          <p className="
            mt-2
            text-4xl
            font-black
            text-white
          ">

            {attendance}%

          </p>

        </div>





        <div className="
          text-5xl
        ">

          🟢

        </div>

      </div>

    </div>

  );

}