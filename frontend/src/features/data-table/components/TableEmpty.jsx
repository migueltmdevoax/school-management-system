export default function TableEmpty({ message = "No results" }) {
  return <div className="p-10 text-center text-gray-500">{message}</div>;
}