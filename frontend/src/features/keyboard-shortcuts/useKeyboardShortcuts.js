import {
  useEffect,
  useRef,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  toggleCommandPalette,
} from "../command-palette/commandPaletteSlice";

import {
  closeSlideOver,
} from "../slide-over/slideOverSlice";

import {
  closeModal,
} from "../modal/modalSlice";

import {
  openSearch,
} from "../search/searchSlice";

import {
  toggleGlobalSearch,
} from "../../global-search/globalSearchSlice";

const useKeyboardShortcuts =
() => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const sequenceRef =
    useRef([]);





  useEffect(() => {

    const handleKeyDown =
      (event) => {

        const key =
          event.key.toLowerCase();





        /*
        |--------------------------------------------------------------------------
        | 🟣 CMD + K
        |--------------------------------------------------------------------------
        */

        if (

          key === "k"

          &&

          (
            event.metaKey ||
            event.ctrlKey
          )

        ) {

          event.preventDefault();





          dispatch(
            toggleCommandPalette()
          );

        }





        /*
        |--------------------------------------------------------------------------
        | 🟣 CMD + SHIFT + F
        |--------------------------------------------------------------------------
        */

        if (

  key === "f" &&

  (
    event.metaKey ||
    event.ctrlKey
  ) &&

  event.shiftKey

) {

  event.preventDefault();

  dispatch(
    toggleGlobalSearch()
  );

}





        /*
        |--------------------------------------------------------------------------
        | 🟣 ESC
        |--------------------------------------------------------------------------
        */

        if (key === "escape") {

          dispatch(
            closeSlideOver()
          );



          dispatch(
            closeModal()
          );

        }





        /*
        |--------------------------------------------------------------------------
        | 🟣 SEQUENCES
        |--------------------------------------------------------------------------
        */

        sequenceRef.current.push(
          key
        );





        if (
          sequenceRef.current.length > 2
        ) {

          sequenceRef.current.shift();

        }





        const sequence =
          sequenceRef.current.join(
            "+"
          );





        /*
        |--------------------------------------------------------------------------
        | 🟣 G + S
        |--------------------------------------------------------------------------
        */

        if (sequence === "g+s") {

          navigate(
            "/app/students"
          );

        }





        /*
        |--------------------------------------------------------------------------
        | 🟣 G + D
        |--------------------------------------------------------------------------
        */

        if (sequence === "g+d") {

          navigate(
            "/app/admin/dashboard"
          );

        }





        /*
        |--------------------------------------------------------------------------
        | 🟣 G + T
        |--------------------------------------------------------------------------
        */

        if (sequence === "g+t") {

          navigate(
            "/app/teachers"
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

  }, [

    dispatch,
    navigate,

  ]);

};

export default
useKeyboardShortcuts;