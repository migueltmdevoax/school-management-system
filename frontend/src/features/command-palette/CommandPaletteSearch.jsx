const CommandPaletteSearch = ({

  value,

  onChange,

}) => {

  return (

    <input

      value={value}

      onChange={onChange}

      placeholder="
        Search commands...
      "

      className="
        w-full
        rounded-2xl
        border
        px-4
        py-3
        outline-none
      "
    />

  );

};

export default
CommandPaletteSearch;