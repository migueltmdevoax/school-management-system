export default function StudentSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search student"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}