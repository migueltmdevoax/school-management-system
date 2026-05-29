import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  Tooltip,

} from "recharts";

import ChartCard
from "./ChartCard";

export default function IncidentsChart({

  data,

}) {

  return (

    <ChartCard
      title="Incidents"
    >

      <div className="
        h-72
      ">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
          >

            <XAxis
              dataKey="name"
            />

            <Tooltip />





            <Line
              type="monotone"
              dataKey="incidents"
              stroke="#ef4444"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </ChartCard>

  );

}