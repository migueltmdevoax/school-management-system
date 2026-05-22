export default function StatusBadge({ average, incidents, payments }) {
  let label = "EXCELENTE";
  let bg = "#d1fae5";
  let color = "#065f46";

  if (average < 7) {
    label = "RIESGO";
    bg = "#fee2e2";
    color = "#991b1b";
  } else if (average < 9) {
    label = "ATENCIÓN";
    bg = "#fef3c7";
    color = "#92400e";
  }

  if (incidents > 0) {
    label = "ALERTA";
    bg = "#fee2e2";
    color = "#991b1b";
  }

  if (payments > 0) {
    label = "PAGO PENDIENTE";
    bg = "#fee2e2";
    color = "#991b1b";
  }

  return (
    <span style={{
      background: bg,
      color: color,
      padding: "5px 10px",
      borderRadius: "999px",
      fontWeight: "bold",
      fontSize: "12px"
    }}>
      {label}
    </span>
  );
}