const BulkCheckbox = ({

  checked,

  onChange,

}) => {

  return (

    <input

      type="checkbox"

      checked={checked}

      onChange={onChange}

      className="
        h-4
        w-4
        rounded
      "
    />

  );

};

export default
BulkCheckbox;