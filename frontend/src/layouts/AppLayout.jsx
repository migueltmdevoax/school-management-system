import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";



export default function AppLayout() {

  return (

    <div className="
      min-h-screen
      bg-gray-950
      text-white
      flex
      overflow-hidden
    ">

      {/* 🔥 SIDEBAR */}
      <Sidebar />



      {/* 🔥 CONTENT */}
      <div className="
        flex-1
        flex
        flex-col
        min-w-0
      ">

        <Header />



        <main className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
          p-6
        ">

          <Outlet />

        </main>

      </div>

    </div>
  );
}