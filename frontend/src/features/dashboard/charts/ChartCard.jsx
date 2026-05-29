export default function ChartCard({

  title,

  children,

}) {

  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-900/70
      backdrop-blur-xl
      p-6
      shadow-2xl
    ">

      <div className="
        mb-6
        flex
        items-center
        justify-between
      ">

        <h2 className="
          text-xl
          font-bold
          text-white
        ">

          {title}

        </h2>

      </div>





      {children}

    </div>

  );

}