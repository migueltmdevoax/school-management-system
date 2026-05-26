export default function TableEmpty({

  message =
    "Sin resultados",

}) {

  return (

    <div className="
      p-10
      text-center
      text-gray-500
    ">

      {message}

    </div>
  );
}