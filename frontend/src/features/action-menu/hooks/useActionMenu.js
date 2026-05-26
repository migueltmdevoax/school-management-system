import {
  useState,
  useRef,
  useEffect,
} from "react";



export function useActionMenu() {

  const [

    open,
    setOpen,

  ] = useState(false);



  const menuRef =
    useRef(null);





  // 🔥 CLOSE OUTSIDE
  useEffect(() => {

    function handleClickOutside(
      event
    ) {

      if (

        menuRef.current &&

        !menuRef.current.contains(
          event.target
        )

      ) {

        setOpen(false);
      }
    }



    document.addEventListener(
      "mousedown",
      handleClickOutside
    );



    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);





  return {

    open,
    setOpen,
    menuRef,
  };
}