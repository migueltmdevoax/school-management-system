const CommandPaletteItem = ({

  item,

  onSelect,

}) => {

  return (

    <button

      onClick={() =>
        onSelect(item)
      }

      className="
        w-full
        rounded-xl
        border
        p-4
        text-left
        transition
        hover:bg-gray-50
      "
    >

      <p
        className="
          font-medium
        "
      >
        {item.title}
      </p>

      <p
        className="
          mt-1
          text-sm
          text-gray-500
        "
      >
        {item.subtitle}
      </p>

    </button>

  );

};

export default
CommandPaletteItem;