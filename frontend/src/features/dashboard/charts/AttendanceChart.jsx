import {

  ResponsiveContainer,

  AreaChart,

  Area,

  XAxis,

  Tooltip,

} from "recharts";

import ChartCard
from "./ChartCard";

export default function AttendanceChart({

  data,

}) {

  return (

    <ChartCard
      title="Attendance"
    >

      <div className="
        h-72
      ">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={data}
          >

            <XAxis
              dataKey="name"
            />

            <Tooltip />





            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.2}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </ChartCard>

  );

}