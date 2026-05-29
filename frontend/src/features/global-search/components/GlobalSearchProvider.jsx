import {
  useSelector,
  useDispatch,
} from "react-redux";

import GlobalSearchModal
from "./GlobalSearchModal";

import {
  closeGlobalSearch,
} from "../globalSearchSlice";

export default function
GlobalSearchProvider() {

  const dispatch =
    useDispatch();

  const open =
    useSelector(

      (state) =>

        state.globalSearch.open
    );





  if (!open)
    return null;





  return (

    <GlobalSearchModal

      onClose={() =>

        dispatch(
          closeGlobalSearch()
        )
      }

    />

  );

}