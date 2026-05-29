export default function QuickActionButton({

  icon,

  title,

  description,

  onClick,

}) {

  return (

    <button

      onClick={onClick}

      className="
        group
        rounded-3xl
        border
        border-gray-800
        bg-gray-900/70
        p-5
        text-left
        transition-all
        hover:border-indigo-500
        hover:bg-gray-900
      "
    >

      <div className="
        flex
        items-start
        gap-4
      ">

        <div className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-indigo-500/20
          text-2xl
        ">

          {icon}

        </div>





        <div>

          <h3 className="
            text-lg
            font-bold
            text-white
          ">

            {title}

          </h3>





          <p className="
            mt-1
            text-sm
            text-gray-400
          ">

            {description}

          </p>

        </div>

      </div>

    </button>

  );

}