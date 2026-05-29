export default function SkeletonTable({

  rows = 5,

}) {

  return (

    <div className="
      overflow-hidden
      rounded-3xl
      border
      border-gray-800
    ">

      {Array.from({

        length: rows,

      }).map((_, index) => (

        <div

          key={index}

          className="
            animate-pulse
            border-b
            border-gray-800
            bg-gray-900/60
            p-6
          "
        >

          <div className="
            flex
            items-center
            justify-between
          ">

            <div className="
              h-5
              w-48
              rounded
              bg-gray-800
            " />





            <div className="
              h-5
              w-24
              rounded
              bg-gray-800
            " />

          </div>

        </div>

      ))}

    </div>

  );

}