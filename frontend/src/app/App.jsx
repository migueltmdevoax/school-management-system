import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useAppSelector,
} from "../hooks/useAppSelector";


// 🟣 ROUTES
import ProtectedRoute
from "../routes/ProtectedRoute";


// 🟣 LAYOUTS
import AppLayout
from "../layouts/AppLayout";


// 🟣 PUBLIC
import HomePage
from "../website/pages/HomePage";

import LoginPage
from "../modules/auth/pages/LoginPage";


// 🟣 ADMIN
import DashboardPage
from "../modules/dashboard/pages/DashboardPage";

import StudentsPage
from "../modules/students/pages/StudentsPage";

import TeachersPage
from "../modules/teacher/pages/TeachersPage";

import GradesPage
from "../modules/grades/pages/GradesPage";


// 🟣 TEACHER
import TeacherDashboard
from "../modules/teacher/pages/TeacherDashboard";

import AssignmentsPage
from "../modules/assignments/pages/AssignmentsPage";


// 🟣 PARENT
import ParentDashboard
from "../modules/parents/pages/ParentDashboard";





function App() {

  const {
    isAuthenticated,
  } = useAppSelector(
    (state) => state.auth
  );



  return (

    <Routes>

      {/* 🌍 PUBLIC */}
      <Route
        path="/"
        element={<HomePage />}
      />



      {/* 🔐 LOGIN */}
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/app/dashboard" />
            : <LoginPage />
        }
      />



      {/* 🛡️ ADMIN APP */}
      <Route

        path="/app"

        element={

          <ProtectedRoute
            allowedRoles={[
              "admin",
              "teacher"
            ]}
          >

            <AppLayout />

          </ProtectedRoute>

        }
      >

        {/* 🟣 ADMIN DASHBOARD */}
        <Route
          path="dashboard"
          element={<DashboardPage />}
        />



        {/* 🟣 STUDENTS */}
        <Route
          path="students"
          element={<StudentsPage />}
        />



        {/* 🟣 TEACHERS CRUD */}
        <Route
          path="teachers"
          element={<TeachersPage />}
        />




        {/* 🟣 GRADES */}
        <Route
          path="grades"
          element={<GradesPage />}
        />



        {/* 🟣 ASSIGNMENTS */}
        <Route
          path="assignments"
          element={<AssignmentsPage />}
        />


        {/* 🟣 PARENTS */}
        <Route
          path="parents"
          element={<ParentDashboard />}
        />



        {/* 👨‍🏫 TEACHER DASHBOARD */}
        <Route
          path="teacher/dashboard"
          element={<TeacherDashboard />}
        />



      </Route>





      {/* 👨‍👩‍👧 PARENT PANEL */}
      <Route

        path="/parent"

        element={

          <ProtectedRoute
            allowedRoles={[
              "parent"
            ]}
          >

            <AppLayout />

          </ProtectedRoute>

        }
      >

        <Route
          index
          element={<ParentDashboard />}
        />

      </Route>





      {/* ❌ FALLBACK */}
      <Route
        path="*"
        element={
          <Navigate to="/" />
        }
      />

    </Routes>

  );

}

export default App;