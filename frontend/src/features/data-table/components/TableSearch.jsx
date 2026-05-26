export default function TableSearch({

  value,
  onChange,

}) {

  return (

    <input
      type="text"

      value={value}

      onChange={(e) =>
        onChange(e.target.value)
      }

      placeholder="Buscar..."

      className="
        bg-gray-900
        border
        border-gray-800
        rounded-xl
        px-4
        py-2
        text-white
        outline-none
        w-full
        max-w-sm
      "
    />
  );
}