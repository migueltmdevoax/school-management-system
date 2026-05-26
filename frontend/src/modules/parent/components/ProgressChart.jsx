import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



export default function ProgressChart({
  metrics,
}) {

  const data = [

    {
      name: "Completed",
      value:
        metrics?.completed || 0,
    },

    {
      name: "Pending",
      value:
        metrics?.pending || 0,
    },

  ];



  return (

    <div className="
      w-full
      h-[220px]
    ">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#3b82f6"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}