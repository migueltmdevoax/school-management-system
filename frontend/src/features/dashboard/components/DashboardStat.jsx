export default function DashboardStat({

  label,

  value,

}) {

  return (

    <div>

      <p className="
        text-xs
        uppercase
        tracking-wide
        text-gray-500
      ">
        {label}
      </p>

      <h4 className="
        mt-1
        text-xl
        font-bold
        text-white
      ">
        {value}
      </h4>

    </div>

  );

}