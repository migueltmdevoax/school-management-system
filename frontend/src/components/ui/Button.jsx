export default function Button({ children, onClick, variant = "primary", type = "button" }) {
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    danger:  "bg-red-500 hover:bg-red-600 text-white",
    ghost:   "bg-transparent hover:bg-gray-700 text-white",
  };
  return (
    <button type={type} onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition ${styles[variant] || styles.primary}`}>
      {children}
    </button>
  );
}