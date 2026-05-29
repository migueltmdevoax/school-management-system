import {
  openSlideOver
} from "../slide-over/slideOverSlice";

import {
  SEARCH_ENTITY_TYPES
} from "../../constants/searchEntityTypes";

export const openSearchResult =
({

  dispatch,

  result,

}) => {

  /*
  |--------------------------------------------------------------------------
  | 🟣 STUDENT
  |--------------------------------------------------------------------------
  */

  dispatch(

    openSlideOver({

      component:
        SEARCH_ENTITY_TYPES.STUDENT,

      entityId:
        result.id,

    })

  );

};