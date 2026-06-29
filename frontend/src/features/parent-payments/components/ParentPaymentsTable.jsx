export default function
ParentPaymentsTable({

  payments = [],

}) {

  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-900/60
      p-6
      overflow-x-auto
    ">

      <h3 className="
        text-xl
        font-bold
        text-white
      ">

        💰 Pagos

      </h3>





      <table className="
        mt-6
        w-full
        min-w-[700px]
      ">

        <thead>

          <tr className="
            border-b
            border-gray-800
            text-left
          ">

            <th className="pb-4 text-gray-400">
              Estudiante
            </th>

            <th className="pb-4 text-gray-400">
              Cantidad
            </th>

            <th className="pb-4 text-gray-400">
              Estado
            </th>

            <th className="pb-4 text-gray-400">
              Fecha limite
            </th>

          </tr>

        </thead>





        <tbody>

          {payments.map((payment) => (

            <tr

              key={payment.id}

              className="
                border-b
                border-gray-900
              "
            >

              <td className="
                py-4
                text-white
              ">

                {payment.first_name}
                {" "}
                {payment.last_name}

              </td>





              <td className="
                py-4
                text-white
              ">

                $
                {payment.amount}

              </td>





              <td className="
                py-4
              ">

                <span className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-bold

                  ${
                    payment.status === "PAID"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }
                `}>

                  {payment.status}

                </span>

              </td>





              <td className="
                py-4
                text-gray-400
              ">

                {payment.due_date}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}