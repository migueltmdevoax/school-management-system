import Sidebar from "./Sidebar"
import Header from "./Header"

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Header />
        <main className="main">
          {children}
        </main>
      </div>
    </div>
  );
}