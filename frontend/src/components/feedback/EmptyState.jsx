export default function EmptyState({

  icon = "📭",

  title = "No data found",

  description =
    "There is nothing here yet.",

}) {

  return (

    <div className="
      flex
      flex-col
      items-center
      justify-center
      rounded-3xl
      border
      border-dashed
      border-gray-800
      bg-gray-900/40
      px-8
      py-16
      text-center
    ">

      <div className="
        text-6xl
      ">

        {icon}

      </div>





      <h3 className="
        mt-6
        text-2xl
        font-black
        text-white
      ">

        {title}

      </h3>





      <p className="
        mt-3
        max-w-md
        text-gray-400
      ">

        {description}

      </p>

    </div>

  );

}