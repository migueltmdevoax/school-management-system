export default function
GlobalSearchItem({

  item,

  onClick,

}) {

  return (

    <button

      onClick={() =>
        onClick(item)
      }

      className="
        w-full
        rounded-2xl
        p-4
        text-left
        transition-all
        hover:bg-gray-800
      "
    >

      <div className="
        flex
        items-center
        gap-4
      ">

        <div className="
          text-2xl
        ">

          {item.icon}

        </div>





        <div>

          <h3 className="
            font-semibold
            text-white
          ">

            {item.title}

          </h3>





          <p className="
            text-sm
            text-gray-400
          ">

            {item.subtitle}

          </p>

        </div>

      </div>

    </button>

  );

}