export default function
SyncBadge({

  status,

}) {

  if (!status) return null;

  const syncing =
    status === "syncing";

  return (

    <div className={`
      inline-flex
      items-center
      gap-2
      rounded-full
      px-2
      py-1
      text-xs
      font-semibold

      ${syncing
        ? `
          bg-yellow-500/20
          text-yellow-300
        `
        : `
          bg-emerald-500/20
          text-emerald-300
        `
      }
    `}>

      <div className={`
        h-2
        w-2
        rounded-full

        ${syncing
          ? "bg-yellow-400"
          : "bg-emerald-400"
        }
      `} />

      {syncing
        ? "Syncing..."
        : "Synced"}

    </div>

  );

}