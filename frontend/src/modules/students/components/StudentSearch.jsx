export default function StudentSearch({

  value,
  onChange,

}) {

  return (

    <input
      type="text"
      placeholder="Search student..."
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      className="
        w-full
        bg-gray-900
        border
        border-gray-800
        rounded-2xl
        px-5
        py-3
        text-white
        outline-none
        focus:border-blue-500
      "
    />

  );
}