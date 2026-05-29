export default function RiskLevelBadge({

  level,

}) {

  const styles = {

    low: `
      bg-green-500/20
      text-green-400
    `,



    medium: `
      bg-yellow-500/20
      text-yellow-400
    `,



    high: `
      bg-red-500/20
      text-red-400
    `,

  };





  return (

    <span className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      capitalize
      ${styles[level]}
    `}>

      {level} risk

    </span>

  );

}