
import { Routes, Route } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

import AppLayout from "./layout/AppLayout"
import ParentDashboard from "./pages/ParentDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"

import DashboardPage from "./pages/DashboardPage"
import StudentsPage from "./pages/StudentsPage"
import TeachersPage from "./pages/TeachersPage"
import AdmissionsPage from "./pages/AdmissionsPage"
import GradesPage from "./pages/GradesPage"

function App() {
  const { user } = useAuth()

  console.log("ROLE:", user?.role)
  console.log("FULL USER:", JSON.stringify(user, null, 2))

  if (!user) return null

  // 👨‍👩‍👧 Parent experience
  if (user.role === "parent") {
    return <ParentDashboard />
  }

  // 🧑‍🏫 Teacher experience
  if (user.role === "teacher") {
    return <TeacherDashboard />
  }

  // 👑 Admin experience
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/grades" element={<GradesPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App

