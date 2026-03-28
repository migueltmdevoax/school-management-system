
import { Routes, Route } from "react-router-dom"

import AppLayout from "./layout/AppLayout"
import DashboardPage from "./pages/DashboardPage"
import StudentsPage from "./pages/StudentsPage"
import TeachersPage from "./pages/TeachersPage"
import AdmissionsPage from "./pages/AdmissionsPage"

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App



