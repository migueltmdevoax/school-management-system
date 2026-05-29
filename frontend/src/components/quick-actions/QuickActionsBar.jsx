const QuickActionsBar = ({
  children,
}) => {

  return (

    <div
      className="
        flex
        flex-wrap
        gap-3
      "
    >
      {children}
    </div>

  );

};

export default QuickActionsBar;