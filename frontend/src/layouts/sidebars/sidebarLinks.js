export const adminLinks = [
  {
    section: "Core",
    links: [
      { to: "/app/admin/dashboard", label: "📊 Panel central" },
      { to: "/app/students",        label: "🎓 Estudiantes" },
      { to: "/app/teachers",        label: "👨‍🏫 Maestros" },
      { to: "/app/parents",         label: "👨‍👩‍👧 Padres de familia" },
    ],
  },
  {
    section: "Academic",
    links: [
      { to: "/app/assignments", label: "📚 Tareas" },
      { to: "/app/grades",      label: "📝 Calificaciones" },
      { to: "/app/attendance",  label: "📋 Asistencia" },
      { to: "/app/incidents",   label: "🚨 Incidentes" },
      { to: "/app/payments",    label: "💰 Pagos" },
    ],
  },
];

export const teacherLinks = [
  {
    section: "Teaching",
    links: [
      { to: "/app/teacher/dashboard", label: "🔥 Mi Panel Central" },
      { to: "/app/assignments",       label: "📚 Tareas" },
      { to: "/app/grades",            label: "📝 Calificaciones" },
      { to: "/app/attendance",        label: "📋 Asistencia" },
      { to: "/app/incidents",         label: "🚨 Incidentes" },
    ],
  },
];

export const parentLinks = [
  {
    section: "Overview",
    links: [
      { to: "/app/parent/dashboard", label: "📊 Progreso de mi hijo" },
      { to: "/app/assignments",      label: "📚 Tareas" },
      { to: "/app/grades",           label: "📝 Calificaciones" },
      { to: "/app/payments",         label: "💳 Pagos" },
    ],
  },
];