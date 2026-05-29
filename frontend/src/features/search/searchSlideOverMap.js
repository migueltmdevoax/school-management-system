import StudentProfileSlideOver
from "../../components/slide-overs/StudentProfileSlideOver";

import {
  SEARCH_ENTITY_TYPES
} from "../../constants/searchEntityTypes";

export const searchSlideOverMap =
{

  [
    SEARCH_ENTITY_TYPES.STUDENT
  ]:
    StudentProfileSlideOver,

};