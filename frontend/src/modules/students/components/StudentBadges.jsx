export default function StudentBadges({ average }) {

  const getStatus = () => {

    if (average >= 9) {
      return {
        label: "🟢 Excelente",
        className: "bg-green-500/20 text-green-400"
      };
    }

    if (average >= 7) {
      return {
        label: "🟡 Atención",
        className: "bg-yellow-500/20 text-yellow-400"
      };
    }

    return {
      label: "🔴 Riesgo",
      className: "bg-red-500/20 text-red-400"
    };
  };

  const status = getStatus();

  return (
    <span className={`
      px-3 py-1
      rounded-full
      text-sm
      font-medium
      ${status.className}
    `}>
      {status.label}
    </span>
  );
}