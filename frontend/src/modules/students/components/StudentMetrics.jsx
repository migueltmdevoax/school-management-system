export default function StudentMetrics({
  average,
  incidents,
  payments
}) {

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">

      <div className="bg-gray-800 rounded-xl p-3">
        <p className="text-gray-400 text-sm">
          Promedio
        </p>

        <h3 className="text-white text-xl font-bold">
          {average?.toFixed(1) || 0}
        </h3>
      </div>

      <div className="bg-gray-800 rounded-xl p-3">
        <p className="text-gray-400 text-sm">
          Incidentes
        </p>

        <h3 className="text-red-400 text-xl font-bold">
          {incidents || 0}
        </h3>
      </div>

      <div className="bg-gray-800 rounded-xl p-3">
        <p className="text-gray-400 text-sm">
          Pagos
        </p>

        <h3 className="text-green-400 text-xl font-bold">
          {payments || "OK"}
        </h3>
      </div>

    </div>
  );
}