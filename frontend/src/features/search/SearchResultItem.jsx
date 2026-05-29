import {
  useDispatch
} from "react-redux";

import {
  openSearchResult
} from "./openSearchResult";

const SearchResultItem = ({

  item,

  type,

}) => {

  const dispatch =
    useDispatch();




  const handleOpen =
    () => {

      openSearchResult({

        dispatch,

        result: item,

      });

    };




  return (

    <button

      onClick={handleOpen}

      className="
        w-full
        rounded-2xl
        border
        p-4
        text-left
        transition
        hover:bg-gray-50
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p className="font-medium">

            {item.first_name}
            {" "}
            {item.last_name}

          </p>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            {item.email}
          </p>

        </div>




        <div
          className="
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-medium
          "
        >

          {type}

        </div>

      </div>

    </button>

  );

};

export default
SearchResultItem;