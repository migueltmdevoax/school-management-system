export default function
ParentChildrenCard({

  children = [],

}) {

  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-900/60
      p-6
    ">

      <h3 className="
        text-xl
        font-bold
        text-white
      ">

        👨‍👩‍👧 My Children

      </h3>





      <div className="
        mt-6
        space-y-4
      ">

        {children.map((child) => (

          <div

            key={child.id}

            className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-950/70
              p-4
            "
          >

            <p className="
              font-semibold
              text-white
            ">

              {child.first_name}
              {" "}
              {child.last_name}

            </p>





            <p className="
              mt-1
              text-sm
              text-gray-400
            ">

              {child.email}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}