import {
  useEffect,
} from "react";



export default function ToastItem({

  toast,
  onClose,

}) {

  useEffect(() => {

    const timer =
      setTimeout(() => {

        onClose(toast.id);

      }, toast.duration);



    return () =>
      clearTimeout(timer);

  }, []);





  return (

    <div className="
      min-w-[320px]
      rounded-2xl
      border
      border-gray-800
      bg-gray-950
      shadow-2xl
      p-4
      animate-in
      slide-in-from-right-5
    ">

      <h3 className="
        text-white
        font-bold
      ">

        {toast.title}

      </h3>





      <p className="
        text-gray-400
        text-sm
        mt-1
      ">

        {toast.message}

      </p>

    </div>
  );
}