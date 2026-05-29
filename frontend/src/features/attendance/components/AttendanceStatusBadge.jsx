export default function AttendanceStatusBadge({

  status,

}) {

  const styles = {

    PRESENT:
      "bg-green-500/20 text-green-400",

    ABSENT:
      "bg-red-500/20 text-red-400",

    LATE:
      "bg-yellow-500/20 text-yellow-400",

  };



  return (

    <span className={`
      rounded-full
      px-3
      py-1
      text-xs
      font-bold
      ${styles[status]}
    `}>

      {status}

    </span>

  );

}