export default function AttendanceRealtimeBadge() {

  return (

    <div className="
      flex
      items-center
      gap-2
      rounded-full
      border
      border-green-500/30
      bg-green-500/10
      px-3
      py-1
      text-xs
      font-bold
      text-green-400
    ">

      <div className="
        h-2
        w-2
        rounded-full
        bg-green-400
        animate-pulse
      " />

      LIVE

    </div>

  );

}