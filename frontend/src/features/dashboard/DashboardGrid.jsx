const DashboardGrid = ({
  children,
}) => {

  return (

    <div
      className="
        grid
        grid-cols-1
        gap-6

        md:grid-cols-2

        xl:grid-cols-4
      "
    >

      {children}

    </div>

  );

};

export default
DashboardGrid;