const SlideOverFooter = ({
  children,
}) => {
  return (
    <div
      className="
        sticky
        bottom-0
        border-t
        bg-white
        px-6
        py-4
      "
    >
      <div className="flex items-center justify-end gap-3">
        {children}
      </div>
    </div>
  );
};

export default SlideOverFooter;