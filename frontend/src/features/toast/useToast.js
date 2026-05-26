import {
  useDispatch,
} from "react-redux";

import {
  addToast,
} from "./toastSlice";



export function useToast() {

  const dispatch =
    useDispatch();



  return {

    success:
      (title, message) => {

        dispatch(

          addToast({

            type: "success",

            title,
            message,
          })
        );
      },



    error:
      (title, message) => {

        dispatch(

          addToast({

            type: "error",

            title,
            message,
          })
        );
      },



    warning:
      (title, message) => {

        dispatch(

          addToast({

            type: "warning",

            title,
            message,
          })
        );
      },



    info:
      (title, message) => {

        dispatch(

          addToast({

            type: "info",

            title,
            message,
          })
        );
      },
  };
}