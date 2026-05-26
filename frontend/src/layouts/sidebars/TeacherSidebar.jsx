import {
  NavLink,
} from "react-router-dom";

import NotificationBell
from "../../features/notifications/components/NotificationBell";

import {
  teacherLinks,
} from "./sidebarLinks";



export default function TeacherSidebar() {

  const linkClass =
    ({ isActive }) => `
      transition-all
      duration-200
      rounded-xl
      px-4
      py-3
      font-medium
      flex
      items-center
      gap-3

      ${
        isActive

          ? `
            bg-blue-600
            text-white
            shadow-lg
          `

          : `
            text-gray-300
            hover:bg-gray-800
            hover:text-white
          `
      }
    `;




  return (

    <div>

      {/* 🔔 NOTIFICATIONS */}
      <div className="
        flex
        justify-end
        mb-6
      ">

        <NotificationBell />

      </div>




      {/* 🔥 NAVIGATION */}
      <nav className="
        flex
        flex-col
        gap-6
      ">

        {teacherLinks.map((group) => (

          <div
            key={group.section}
            className="space-y-2"
          >

            <p className="
              text-gray-500
              text-xs
              uppercase
              tracking-widest
              px-2
            ">
              {group.section}
            </p>

            {group.links.map((link) => (

              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
              >
                {link.label}
              </NavLink>

            ))}

          </div>

        ))}

      </nav>

    </div>
  );
}