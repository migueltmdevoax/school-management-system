import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";



export default function GradesChart({
  grades = [],
}) {

  const data =
    grades.map((g, index) => ({

      name:
        `T${index + 1}`,

      score:
        Number(g.grade),

    }));



  if (!data.length) {

    return (

      <div className="
        bg-gray-900
        rounded-2xl
        p-5
        text-gray-400
      ">
        No grades data
      </div>

    );
  }



  return (

    <div className="
      w-full
      h-[250px]
    ">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="name" />

          <YAxis domain={[0, 10]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}