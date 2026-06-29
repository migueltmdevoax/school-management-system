import {
  useState
} from "react";

import {
  useCreatePaymentMutation
} from "../../features/payments/paymentsApi";

const CreatePaymentQuickAction = ({
  studentId,
}) => {

  const [
    createPayment,
  ] = useCreatePaymentMutation();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleCreate =
    async () => {

      try {

        setLoading(true);

        await createPayment({

          studentId,

          amount: 1500,

          dueDate:
            "2026-06-30",

        }).unwrap();

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <button

      onClick={handleCreate}

      disabled={loading}

      className="
        rounded-xl
        border
        px-4
        py-2
        text-sm
        font-medium
        hover:bg-gray-100
      "
    >

      {loading
        ? "Creando..."
        : "Crear pago"}

    </button>

  );

};

export default CreatePaymentQuickAction;