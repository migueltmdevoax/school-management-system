import {
  useGetEntityActivityQuery
} from "../../features/activity/activityApi";

import ActivityItem
from "./ActivityItem";

const ActivityTimeline = ({
  entityType,
  entityId,
}) => {

  const {
    data,
    isLoading,
  } = useGetEntityActivityQuery({

    entityType,
    entityId,

  });

  if (isLoading) {

    return (
      <div>
        Loading timeline...
      </div>
    );

  }

  const activities =
    data?.data || [];

  return (

    <div className="space-y-3">

      {activities.map((item) => (

        <ActivityItem
          key={item.id}
          item={item}
        />

      ))}

    </div>

  );

};

export default ActivityTimeline;