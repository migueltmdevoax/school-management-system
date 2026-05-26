import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



// 🔥 LAYOUT
import AppLayout
from "../layouts/AppLayout";



// 🔥 ROUTES
import ProtectedRoute
from "../routes/ProtectedRoute";

import RoleRoute
from "../routes/RoleRoute";



// 🔥 AUTH
import LoginPage
from "../modules/auth/pages/LoginPage";



// 🔥 ROLE DASHBOARDS
import AdminDashboard
from "../modules/admin/pages/AdminDashboard";

import TeacherDashboard
from "../modules/teacher/pages/TeacherDashboard";

import ParentDashboard
from "../modules/parent/pages/ParentDashboard";



// 🔥 ADMIN MODULES
import StudentsPage
from "../modules/students/pages/StudentsPage";

import TeachersPage
from "../modules/teacher/pages/TeachersPage";



// 🔥 SHARED MODULES
import AssignmentsPage
from "../modules/assignments/pages/AssignmentsPage";

import GradesPage
from "../modules/grades/pages/GradesPage";

import RoleBasedRedirect
from "../routes/RoleBasedRedirect";

import IncidentsPage
from "../modules/incidents/pages/IncidentsPage";



export default function App() {

  return (


      <Routes>



        {/* ===================================================== */}
        {/* 🔥 PUBLIC */}
        {/* ===================================================== */}

        <Route
          path="/login"
          element={<LoginPage />}
        />








        {/* ===================================================== */}
        {/* 🔥 PROTECTED */}
        {/* ===================================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/app"
            element={<AppLayout />}
          >






            {/* ===================================================== */}
            {/* 🔥 DEFAULT REDIRECT */}
            {/* ===================================================== */}

            <Route
            index
            element={
                   <RoleBasedRedirect />
                 }
              />




            {/* ===================================================== */}
            {/* 🔥 ADMIN */}
            {/* ===================================================== */}

            <Route
              path="admin/dashboard"
              element={

                <RoleRoute
                  allowedRoles={[
                    "admin",
                  ]}
                >

                  <AdminDashboard />

                </RoleRoute>

              }
            />







            <Route
              path="students"
              element={

                <RoleRoute
                  allowedRoles={[
                    "admin",
                  ]}
                >

                  <StudentsPage />

                </RoleRoute>

              }
            />







            <Route
              path="teachers"
              element={

                <RoleRoute
                  allowedRoles={[
                    "admin",
                  ]}
                >

                  <TeachersPage />

                </RoleRoute>

              }
            />








            {/* ===================================================== */}
            {/* 🔥 TEACHER */}
            {/* ===================================================== */}

            <Route
              path="teacher/dashboard"
              element={

                <RoleRoute
                  allowedRoles={[
                    "teacher",
                  ]}
                >

                  <TeacherDashboard />

                </RoleRoute>

              }
            />

            <Route
  path="incidents"
  element={

    <RoleRoute
      allowedRoles={[
        "admin",
        "teacher",
      ]}
    >

      <IncidentsPage />

    </RoleRoute>

  }
/>








            {/* ===================================================== */}
            {/* 🔥 PARENT */}
            {/* ===================================================== */}

            <Route
              path="parent/dashboard"
              element={

                <RoleRoute
                  allowedRoles={[
                    "parent",
                  ]}
                >

                  <ParentDashboard />

                </RoleRoute>

              }
            />








            {/* ===================================================== */}
            {/* 🔥 SHARED */}
            {/* ===================================================== */}

            <Route
              path="assignments"
              element={

                <RoleRoute
                  allowedRoles={[
                    "admin",
                    "teacher",
                    "parent",
                  ]}
                >

                  <AssignmentsPage />

                </RoleRoute>

              }
            />








            <Route
              path="grades"
              element={

                <RoleRoute
                  allowedRoles={[
                    "admin",
                    "teacher",
                    "parent",
                  ]}
                >

                  <GradesPage />

                </RoleRoute>

              }
            />








            {/* ===================================================== */}
            {/* 🔥 APP FALLBACK */}
            {/* ===================================================== */}

            <Route
  path="*"
  element={
    <RoleBasedRedirect />
  }
/>

          </Route>

        </Route>








        {/* ===================================================== */}
        {/* 🔥 GLOBAL FALLBACK */}
        {/* ===================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

  );

}