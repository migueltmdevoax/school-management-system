export default function ActivityIcon({

  action,

}) {

  const icons = {

    student_created: "👨‍🎓",

    payment_created: "💰",

    payment_paid: "✅",

    incident_created: "🚨",

    student_updated: "✏️",

  };





  return (

    <div className="
      w-10
      h-10
      rounded-2xl
      bg-gray-800
      flex
      items-center
      justify-center
      text-lg
      shrink-0
    ">

      {icons[action] || "📌"}

    </div>

  );

}