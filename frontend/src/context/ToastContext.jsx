import {
  createContext,
  useContext,
  useState,
} from "react";



const ToastContext =
  createContext();



export function ToastProvider({
  children,
}) {

  const [
    toasts,
    setToasts,
  ] = useState([]);




  const showToast = (

    message,

    type = "info"

  ) => {

    const id =
      crypto.randomUUID();



    const toast = {

      id,

      message,

      type,
    };



    setToasts(prev => [
      ...prev,
      toast,
    ]);



    setTimeout(() => {

      setToasts(prev =>

        prev.filter(
          toast =>
            toast.id !== id
        )
      );

    }, 3000);
  };



  return (

    <ToastContext.Provider
      value={{
        showToast,
      }}
    >

      {children}



      {/* 🟣 TOAST STACK */}
      <div className="
        fixed
        top-5
        right-5
        z-[9999]
        flex
        flex-col
        gap-3
      ">

        {toasts.map(
          (toast) => (

          <div

            key={toast.id}

            className={`
              min-w-[280px]
              px-4
              py-3
              rounded-xl
              shadow-2xl
              text-white
              font-medium
              animate-pulse

              ${
                toast.type === "success"
                  ? "bg-green-600"

                : toast.type === "error"
                  ? "bg-red-600"

                : toast.type === "loading"
                  ? "bg-yellow-600"

                : "bg-blue-600"
              }
            `}
          >

            {toast.message}

          </div>
        ))}

      </div>

    </ToastContext.Provider>
  );
}



export function useToast() {

  return useContext(
    ToastContext
  );
}