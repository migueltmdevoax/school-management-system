import {
  useMemo,
} from "react";

export default function
useGlobalSearch({

  items,

  query,

}) {

  return useMemo(() => {

    if (!query) {

      return items;

    }

    return items.filter(
      (item) =>

        item.title
          .toLowerCase()

          .includes(
            query.toLowerCase()
          )
    );

  }, [

    items,

    query,

  ]);

}