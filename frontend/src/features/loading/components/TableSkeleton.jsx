export default function TableSkeleton({

  rows = 6,

}) {

  return (

    <div className="
      flex
      flex-col
      gap-3
    ">

      {[...Array(rows)].map(
        (_, index) => (

        <div

          key={index}

          className="
            h-14
            rounded-xl

            bg-gray-900

            animate-pulse
          "
        />
      ))}

    </div>
  );
}