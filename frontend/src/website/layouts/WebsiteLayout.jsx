const WebsiteLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {children}
    </div>
  );
};

export default WebsiteLayout;