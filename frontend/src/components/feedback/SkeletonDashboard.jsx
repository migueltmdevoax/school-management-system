import SkeletonCard
from "./SkeletonCard";

export default function
SkeletonDashboard() {

  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
    ">

      {Array.from({

        length: 4,

      }).map((_, index) => (

        <SkeletonCard
          key={index}
        />

      ))}

    </div>

  );

}