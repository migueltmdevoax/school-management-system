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
  {
    // 🔥 V2.0 — Solo visible cuando la escuela es tipo "estancia"
    // Por ahora se muestra siempre para que puedas probar
    // Después lo condicionales con school_config
    section: "Estancia Infantil",
    links: [
      { to: "/app/daily-reports",   label: "📋 Reporte Diario" },
      { to: "/app/pickup-control",  label: "🚪 Entrada / Salida" },
      { to: "/app/milestones",      label: "🌱 Hitos de Desarrollo" },
      { to: "/app/medication-log",  label: "💊 Medicamentos" },
      { to: "/app/allergies",       label: "⚠️ Alergias" },
      { to: "/app/messages",        label: "💬 Mensajes" },
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
  {
    // 🔥 V2.0 — Estancia Infantil
    section: "Estancia Infantil",
    links: [
      { to: "/app/daily-reports",  label: "📋 Reporte Diario" },
      { to: "/app/pickup-control", label: "🚪 Entrada / Salida" },
      { to: "/app/milestones",     label: "🌱 Hitos de Desarrollo" },
      { to: "/app/medication-log", label: "💊 Medicamentos" },
      { to: "/app/allergies",      label: "⚠️ Alergias" },
      { to: "/app/messages",       label: "💬 Mensajes" },
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
  {
    section: "Estancia Infantil",
    links: [
      { to: "/app/daily-reports",  label: "📋 Reporte del día" },
      { to: "/app/pickup-control", label: "🚪 Entrada / Salida" },
      { to: "/app/milestones",     label: "🌱 Desarrollo" },
      { to: "/app/medication-log", label: "💊 Medicamentos" },
      { to: "/app/allergies",      label: "⚠️ Alergias" }, // 🔥 Faltaba esta
      { to: "/app/messages",       label: "💬 Mensajes" },
    ],
  },
];