export default function UnreadBadge({

  count,

}) {

  if (!count) return null;



  return (

    <span className="
      absolute
      -top-2
      -right-2

      bg-red-500
      text-white

      text-xs
      font-bold

      min-w-[22px]
      h-[22px]

      px-1

      rounded-full

      flex
      items-center
      justify-center

      animate-pulse

      shadow-lg
      shadow-red-500/40
    ">

      {count}

    </span>
  );
}