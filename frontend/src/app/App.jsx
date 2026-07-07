import { useEffect }               from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector }             from "react-redux";
import { registerRealtime }        from "../realtime/registerRealtime";
import { store }                   from "./store";

import HomePage          from "../website/pages/HomePage";
import LoginPage         from "../modules/auth/pages/LoginPage";
import AdminDashboard    from "../modules/admin/pages/AdminDashboard";
import ParentsPage       from "../modules/admin/pages/ParentsPage";
import StudentsPage      from "../modules/students/pages/StudentsPage";
import TeachersPage      from "../modules/teacher/pages/TeachersPage";
import TeacherDashboard  from "../modules/teacher/pages/TeacherDashboard";
import ParentDashboard   from "../modules/parent/pages/ParentDashboard";
import AssignmentsPage   from "../modules/assignments/pages/AssignmentsPage";
import GradesPage        from "../modules/grades/pages/GradesPage";
import AttendancePage    from "../modules/teacher/pages/AttendancePage";
import IncidentsPage     from "../modules/incidents/pages/IncidentsPage";
import PaymentsPage      from "../pages/PaymentsPage";
import AppLayout         from "../layouts/AppLayout";
import ProtectedRoute    from "../routes/ProtectedRoute";
import RoleRoute         from "../routes/RoleRoute";
import RoleBasedRedirect from "../routes/RoleBasedRedirect";

// 🔥 V2.0 — Estancia Infantil
import DailyReportPage   from "../modules/estancia/pages/DailyReportPage";
import PickupControlPage from "../modules/estancia/pages/PickupControlPage";
import MilestonesPage    from "../modules/estancia/pages/MilestonesPage";
import MedicationLogPage from "../modules/estancia/pages/MedicationLogPage";
import AllergiesPage     from "../modules/estancia/pages/AllergiesPage";
import MessagesPage      from "../modules/estancia/pages/MessagesPage";

export default function App() {
  const { isAuthenticated } = useSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) registerRealtime(store);
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/"      element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<RoleBasedRedirect />} />

          {/* ADMIN */}
          <Route path="admin/dashboard" element={
            <RoleRoute allowedRoles={["admin"]}><AdminDashboard /></RoleRoute>
          } />
          <Route path="students" element={
            <RoleRoute allowedRoles={["admin"]}><StudentsPage /></RoleRoute>
          } />
          <Route path="teachers" element={
            <RoleRoute allowedRoles={["admin"]}><TeachersPage /></RoleRoute>
          } />
          <Route path="parents" element={
            <RoleRoute allowedRoles={["admin"]}><ParentsPage /></RoleRoute>
          } />
          <Route path="payments" element={
            <RoleRoute allowedRoles={["admin","parent"]}><PaymentsPage /></RoleRoute>
          } />

          {/* TEACHER */}
          <Route path="teacher/dashboard" element={
            <RoleRoute allowedRoles={["teacher"]}><TeacherDashboard /></RoleRoute>
          } />

          {/* PARENT */}
          <Route path="parent/dashboard" element={
            <RoleRoute allowedRoles={["parent"]}><ParentDashboard /></RoleRoute>
          } />

          {/* SHARED */}
          <Route path="assignments" element={
            <RoleRoute allowedRoles={["admin","teacher","parent"]}><AssignmentsPage /></RoleRoute>
          } />
          <Route path="grades" element={
            <RoleRoute allowedRoles={["admin","teacher","parent"]}><GradesPage /></RoleRoute>
          } />
          <Route path="attendance" element={
            <RoleRoute allowedRoles={["admin","teacher"]}><AttendancePage /></RoleRoute>
          } />
          <Route path="incidents" element={
            <RoleRoute allowedRoles={["admin","teacher"]}><IncidentsPage /></RoleRoute>
          } />

          {/* 🔥 V2.0 — ESTANCIA INFANTIL */}
          <Route path="daily-reports" element={
            <RoleRoute allowedRoles={["admin","teacher","parent"]}><DailyReportPage /></RoleRoute>
          } />
          <Route path="pickup-control" element={
            <RoleRoute allowedRoles={["admin","teacher","parent"]}><PickupControlPage /></RoleRoute>
          } />
          <Route path="milestones" element={
            <RoleRoute allowedRoles={["admin","teacher","parent"]}><MilestonesPage /></RoleRoute>
          } />
          <Route path="medication-log" element={
            <RoleRoute allowedRoles={["admin","teacher","parent"]}><MedicationLogPage /></RoleRoute>
          } />
          <Route path="allergies" element={
            <RoleRoute allowedRoles={["admin","teacher"]}><AllergiesPage /></RoleRoute>
          } />
          <Route path="messages" element={
            <RoleRoute allowedRoles={["admin","teacher","parent"]}><MessagesPage /></RoleRoute>
          } />

          <Route path="*" element={<RoleBasedRedirect />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}