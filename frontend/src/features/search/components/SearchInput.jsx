export default function SearchInput({

  value,

  onChange,

}) {

  return (

    <input

      value={value}

      onChange={onChange}

      placeholder="
        Search students...
      "

      className="
        w-full
        rounded-2xl
        border
        border-gray-800
        bg-gray-900
        px-5
        py-4
        text-white
        outline-none
        transition-all
        focus:border-indigo-500
      "
    />

  );

}