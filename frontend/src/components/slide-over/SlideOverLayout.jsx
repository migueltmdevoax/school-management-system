const SlideOverLayout = ({ header, children, footer }) => (
  <div className="flex h-full flex-col bg-white shadow-2xl">
    {header}
    <div className="flex-1 overflow-y-auto">{children}</div>
    {footer}
  </div>
);
export default SlideOverLayout;