export default function DashboardTrend({

  value = 0,

}) {

  const positive =
    value >= 0;

  return (

    <div className={`
      inline-flex
      items-center
      gap-1
      rounded-full
      px-2
      py-1
      text-xs
      font-semibold

      ${
        positive
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }
    `}>

      <span>

        {positive ? "📈" : "📉"}

      </span>

      {positive ? "+" : ""}
      {value}%

    </div>

  );

}