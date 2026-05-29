import {
  useEffect
} from "react";

import {
  useDispatch
} from "react-redux";

import {
  toggleCommandPalette
} from "../features/command-palette/commandPaletteSlice";

const useCommandPalette =
() => {

  const dispatch =
    useDispatch();

  useEffect(() => {

    const handleKeyDown =
      (event) => {

        const isK =
          event.key.toLowerCase() ===
          "k";



        const isCmd =
          event.metaKey;



        const isCtrl =
          event.ctrlKey;



        if (
          isK &&
          (isCmd || isCtrl)
        ) {

          event.preventDefault();

          dispatch(
            toggleCommandPalette()
          );

        }

      };



    window.addEventListener(
      "keydown",
      handleKeyDown
    );



    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [dispatch]);

};

export default
useCommandPalette;