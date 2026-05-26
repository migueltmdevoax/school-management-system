import { useState } from "react";



export function useSorting() {

  const [

    sortKey,
    setSortKey,

  ] = useState(null);



  const [

    direction,
    setDirection,

  ] = useState("asc");



  const handleSort = (key) => {

    if (sortKey === key) {

      setDirection((prev) =>

        prev === "asc"
          ? "desc"
          : "asc"
      );

    } else {

      setSortKey(key);

      setDirection("asc");
    }
  };



  return {

    sortKey,
    direction,
    handleSort,
  };
}