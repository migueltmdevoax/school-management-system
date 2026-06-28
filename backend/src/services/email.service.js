const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@tu-colegio.com";
const APP_NAME   = process.env.APP_NAME   || "Sistema Escolar";

// 🔥 Lazy import — solo carga Resend cuando hay API key
let resendInstance = null;

const getResend = async () => {
  if (!process.env.RESEND_API_KEY) return null;
  if (resendInstance) return resendInstance;

  const { Resend } = await import("resend");
  resendInstance = new Resend(process.env.RESEND_API_KEY);
  return resendInstance;
};

export async function sendIncidentEmail({ toEmail, parentName, studentName, incidentTitle, severity }) {
  const resend = await getResend();
  if (!resend) {
    console.warn("⚠️ RESEND_API_KEY not set, skipping incident email");
    return;
  }
  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      toEmail,
      subject: `🚨 Incidente reportado — ${studentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1f2937; padding: 24px; border-radius: 12px;">
            <h1 style="color: #fff; margin: 0;">🎓 ${APP_NAME}</h1>
          </div>
          <div style="padding: 24px; background: #f9fafb;">
            <p>Estimado/a <strong>${parentName}</strong>,</p>
            <p>Se ha registrado un incidente con <strong>${studentName}</strong>:</p>
            <div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 16px; margin: 16px 0;">
              <p style="margin:0; font-weight:bold; color:#991b1b;">${incidentTitle}</p>
              <p style="margin:8px 0 0; color:#991b1b;">Severidad: ${severity}</p>
            </div>
            <a href="${process.env.FRONTEND_URL}"
               style="display:inline-block; background:#2563eb; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; margin-top:16px;">
              Ver detalles
            </a>
          </div>
          <p style="color:#9ca3af; font-size:12px; text-align:center;">${APP_NAME} — Oaxaca, México</p>
        </div>
      `,
    });
    console.log(`✅ Incident email sent to ${toEmail}`);
  } catch (error) {
    console.error("❌ Incident email error:", error.message);
  }
}

export async function sendPaymentEmail({ toEmail, parentName, studentName, amount, dueDate }) {
  const resend = await getResend();
  if (!resend) {
    console.warn("⚠️ RESEND_API_KEY not set, skipping payment email");
    return;
  }
  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      toEmail,
      subject: `💰 Pago pendiente — ${studentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1f2937; padding: 24px; border-radius: 12px;">
            <h1 style="color: #fff; margin: 0;">🎓 ${APP_NAME}</h1>
          </div>
          <div style="padding: 24px; background: #f9fafb;">
            <p>Estimado/a <strong>${parentName}</strong>,</p>
            <p>Hay un pago pendiente para <strong>${studentName}</strong>:</p>
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 16px 0;">
              <p style="margin:0; font-weight:bold; color:#92400e;">Monto: $${Number(amount).toFixed(2)} MXN</p>
              ${dueDate ? `<p style="margin:8px 0 0; color:#92400e;">Vencimiento: ${dueDate}</p>` : ""}
            </div>
            <a href="${process.env.FRONTEND_URL}"
               style="display:inline-block; background:#2563eb; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; margin-top:16px;">
              Ver detalles
            </a>
          </div>
          <p style="color:#9ca3af; font-size:12px; text-align:center;">${APP_NAME} — Oaxaca, México</p>
        </div>
      `,
    });
    console.log(`✅ Payment email sent to ${toEmail}`);
  } catch (error) {
    console.error("❌ Payment email error:", error.message);
  }
}

export async function sendWelcomeEmail({ toEmail, name, role, tempPassword }) {
  const resend = await getResend();
  if (!resend) {
    console.warn("⚠️ RESEND_API_KEY not set, skipping welcome email");
    return;
  }
  const roleLabel = {
    admin:   "Administrador",
    teacher: "Maestro",
    parent:  "Padre de familia",
  }[role] || role;

  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      toEmail,
      subject: `🎓 Bienvenido a ${APP_NAME}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1f2937; padding: 24px; border-radius: 12px;">
            <h1 style="color: #fff; margin: 0;">🎓 ${APP_NAME}</h1>
          </div>
          <div style="padding: 24px; background: #f9fafb;">
            <p>Hola <strong>${name}</strong>,</p>
            <p>Tu cuenta ha sido creada como <strong>${roleLabel}</strong>.</p>
            <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; margin: 16px 0;">
              <p style="margin:0; color:#1e40af;"><strong>Email:</strong> ${toEmail}</p>
              ${tempPassword ? `<p style="margin:8px 0 0; color:#1e40af;"><strong>Contraseña temporal:</strong> ${tempPassword}</p>` : ""}
            </div>
            ${tempPassword ? `<p>Por favor cambia tu contraseña al iniciar sesión.</p>` : ""}
            <a href="${process.env.FRONTEND_URL}"
               style="display:inline-block; background:#2563eb; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; margin-top:16px;">
              Iniciar sesión
            </a>
          </div>
          <p style="color:#9ca3af; font-size:12px; text-align:center;">${APP_NAME} — Oaxaca, México</p>
        </div>
      `,
    });
    console.log(`✅ Welcome email sent to ${toEmail}`);
  } catch (error) {
    console.error("❌ Welcome email error:", error.message);
  }
}

export async function sendAssignmentEmail({ toEmail, parentName, studentName, assignmentTitle, dueDate, groupName }) {
  const resend = await getResend();
  if (!resend) {
    console.warn("⚠️ RESEND_API_KEY not set, skipping assignment email");
    return;
  }
  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      toEmail,
      subject: `📚 Nueva tarea — ${studentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1f2937; padding: 24px; border-radius: 12px;">
            <h1 style="color: #fff; margin: 0;">🎓 ${APP_NAME}</h1>
          </div>
          <div style="padding: 24px; background: #f9fafb;">
            <p>Estimado/a <strong>${parentName}</strong>,</p>
            <p>Se publicó una nueva tarea para <strong>${studentName}</strong>${groupName ? ` (${groupName})` : ""}:</p>
            <div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 16px; margin: 16px 0;">
              <p style="margin:0; font-weight:bold; color:#1e3a8a;">${assignmentTitle}</p>
              ${dueDate ? `<p style="margin:8px 0 0; color:#1e3a8a;">Fecha límite: ${new Date(dueDate).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</p>` : ""}
            </div>
            <a href="${process.env.FRONTEND_URL}"
               style="display:inline-block; background:#2563eb; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; margin-top:16px;">
              Ver tarea
            </a>
          </div>
          <p style="color:#9ca3af; font-size:12px; text-align:center;">${APP_NAME} — Oaxaca, México</p>
        </div>
      `,
    });
    console.log(`✅ Assignment email sent to ${toEmail}`);
  } catch (error) {
    console.error("❌ Assignment email error:", error.message);
  }
}