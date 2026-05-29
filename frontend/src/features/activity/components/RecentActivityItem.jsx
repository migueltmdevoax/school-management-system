import ActivityIcon
from "./ActivityIcon";

export default function RecentActivityItem({

  activity,

}) {

  return (

    <div className="
      flex
      items-start
      gap-4
      rounded-2xl
      border
      border-gray-800
      bg-gray-900/50
      p-4
    ">

      <ActivityIcon
        action={activity.action}
      />





      <div className="
        min-w-0
      ">

        <h4 className="
          font-semibold
          text-white
        ">

          {activity.title}

        </h4>





        <p className="
          mt-1
          text-sm
          text-gray-400
        ">

          {activity.description}

        </p>





        <p className="
          mt-2
          text-xs
          text-gray-500
        ">

          {new Date(
            activity.created_at
          ).toLocaleString()}

        </p>

      </div>

    </div>

  );

}