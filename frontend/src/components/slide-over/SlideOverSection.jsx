const SlideOverSection = ({
  title,
  children,
}) => {
  return (
    <section className="border-b px-6 py-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h3>

      {children}
    </section>
  );
};

export default SlideOverSection;