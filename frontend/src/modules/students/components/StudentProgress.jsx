export default function StudentProgress({
  progress,
}) {

  return (

    <div className="mt-5">

      <div className="
        flex
        justify-between
        mb-2
      ">

        <span className="
          text-gray-300
          text-sm
        ">
          Progreso
        </span>

        <span className="
          text-gray-400
          text-sm
        ">
          {progress || 0}%
        </span>

      </div>



      <div className="
        w-full
        h-3
        bg-gray-700
        rounded-full
        overflow-hidden
      ">

        <div
          className="
            h-full
            bg-blue-500
            rounded-full
            transition-all
            duration-500
          "
          style={{
            width: `${progress || 0}%`
          }}
        />

      </div>

    </div>
  );
}