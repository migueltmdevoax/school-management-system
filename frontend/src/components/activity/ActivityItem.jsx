const ActivityItem = ({
  item,
}) => {

  return (

    <div
      className="
        rounded-2xl
        border
        p-4
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <h4 className="font-semibold">
            {item.title}
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            {item.description}
          </p>

        </div>

      </div>

      <p className="mt-3 text-xs text-gray-400">
        {new Date(
          item.created_at
        ).toLocaleString()}
      </p>

    </div>

  );

};

export default ActivityItem;