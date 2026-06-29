import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import ChartCard from "./ChartCard";

export default function PaymentsChart({ data }) {
  return (
    <ChartCard title="Pagos">
      <div style={{ width: "100%", minHeight: 288 }}>
        <ResponsiveContainer width="100%" height={288}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="payments" radius={[8, 8, 0, 0]} fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}