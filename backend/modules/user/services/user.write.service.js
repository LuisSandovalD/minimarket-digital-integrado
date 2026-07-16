const bcrypt = require("bcryptjs");
const repository = require("../repositories/user.repository");
const { sendEmail } = require("../../../config/email.config");

const sendUserWelcomeEmail = async ({ email, name, password, role }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: "¡Bienvenido a la plataforma! - Tus credenciales de acceso",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
        <h2 style="color: #2563eb;">¡Hola, ${name}!</h2>
        <p>Un administrador te ha registrado en el sistema **ERP POS System** de tu empresa.</p>
        <p>A partir de este momento puedes acceder a la plataforma utilizando las siguientes credenciales temporales:</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #2563eb;">
          <p style="margin: 4px 0;"><strong>Enlace de acceso:</strong> <a href="http://localhost:5173/" style="color: #2563eb; text-decoration: none;">Ir al Panel de Control</a></p>
          <p style="margin: 4px 0;"><strong>Usuario / Email:</strong> ${email}</p>
          <p style="margin: 4px 0;"><strong>Contraseña provisoria:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${password}</code></p>
          <p style="margin: 4px 0;"><strong>Rol asignado:</strong> ${role}</p>
        </div>

        <p style="font-size: 14px; color: #ef4444; font-weight: bold;">⚠️ Por seguridad, recuerda cambiar esta contraseña en tu perfil apenas inicies sesión por primera vez.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #94a3b8;">Sistema de Gestión Corporativa - ERP POS System</small>
      </div>
    `,
  });
};

const sendUserUpdateEmail = async ({ email, name, passwordChanged }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: "Actualización de Cuenta - ERP POS System",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
        <h2 style="color: #2563eb;">Hola, ${name}</h2>
        <p>Te informamos que tu perfil de usuario ha sido actualizado en nuestro sistema.</p>
        ${passwordChanged ? "<p style=\"color: #ea580c; font-weight: bold;\">⚠️ Tu contraseña de acceso ha sido restablecida o modificada.</p>" : ""}
        <p>Si no has solicitado estos cambios o consideras que es un error, comunícate con el administrador de inmediato.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #94a3b8;">Sistema de Gestión Corporativa - ERP POS System</small>
      </div>
    `,
  });
};

const sendUserStatusEmail = async ({ email, name, isActive }) => {
  if (!email) return;

  const subject = isActive ? "Cuenta Activada - ERP POS System" : "Cuenta Desactivada - ERP POS System";
  const titleColor = isActive ? "#16a34a" : "#dc2626";
  const message = isActive
    ? "Nos alegra informarte que tu cuenta de usuario ha sido habilitada nuevamente. Ya puedes ingresar al sistema de manera habitual."
    : "Te notificamos que tu cuenta de usuario ha sido desactivada temporalmente por la administración. No podrás acceder a la plataforma hasta nuevo aviso.";

  return await sendEmail({
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
        <h2 style="color: ${titleColor};">${isActive ? "¡Cuenta Habilitada!" : "Cuenta Suspendida"}</h2>
        <p>Estimado(a) ${name},</p>
        <p>${message}</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #94a3b8;">Sistema de Gestión Corporativa - ERP POS System</small>
      </div>
    `,
  });
};

const createUser = async (body, companyId) => {
  if (!body.password) {
    throw new Error("La contraseña es requerida");
  }

  const newUser = await repository.create({
    name: body.name,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
    phone: body.phone || "",
    avatar: body.avatar || "",
    role: body.role || "EMPLOYEE",
    branchId: body.branchId || null,
    managerId: body.managerId || null,
    isActive: body.isActive ?? true,
    companyId,
  });

  if (newUser && newUser.email) {
    try {
      await sendUserWelcomeEmail({
        email: newUser.email,
        name: newUser.name,
        password: body.password,
        role: newUser.role,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de bienvenida con credenciales:", emailError.message || emailError);
    }
  }

  return newUser;
};

const updateUser = async (id, companyId, body) => {
  if (body.managerId && Number(body.managerId) === Number(id)) {
    throw new Error("Un usuario no puede ser su propio manager");
  }

  const data = {};

  if (body.name !== undefined) data.name = body.name;
  if (body.email !== undefined) data.email = body.email;
  if (body.phone !== undefined) data.phone = body.phone;
  if (body.avatar !== undefined) data.avatar = body.avatar;
  if (body.role !== undefined) data.role = body.role;
  if (body.branchId !== undefined) data.branchId = body.branchId || null;
  if (body.managerId !== undefined) data.managerId = body.managerId || null;
  if (body.isActive !== undefined) data.isActive = body.isActive;

  const passwordChanged = !!body.password;
  if (passwordChanged) {
    data.password = await bcrypt.hash(body.password, 10);
  }

  const updatedUser = await repository.update(id, companyId, data);

  if (updatedUser && updatedUser.email) {
    try {
      await sendUserUpdateEmail({
        email: updatedUser.email,
        name: updatedUser.name,
        passwordChanged,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de actualización de usuario:", emailError.message || emailError);
    }
  }

  return updatedUser;
};

const deleteUser = async (id, companyId) => {
  const deletedUser = await repository.softDelete(id, companyId);

  if (deletedUser && deletedUser.email) {
    try {
      await sendUserStatusEmail({
        email: deletedUser.email,
        name: deletedUser.name,
        isActive: false,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de desactivación (soft delete):", emailError.message || emailError);
    }
  }

  return deletedUser;
};

const restoreUser = async (id, companyId) => {
  const restoredUser = await repository.restore(id, companyId);

  if (restoredUser && restoredUser.email) {
    try {
      await sendUserStatusEmail({
        email: restoredUser.email,
        name: restoredUser.name,
        isActive: true,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de restauración de usuario:", emailError.message || emailError);
    }
  }

  return restoredUser;
};

const toggleUserStatus = async (id, companyId) => {
  const user = await repository.toggleStatus(id, companyId);

  if (user && user.email) {
    try {
      await sendUserStatusEmail({
        email: user.email,
        name: user.name,
        isActive: user.isActive,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de cambio de estado (toggle):", emailError.message || emailError);
    }
  }

  return user;
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  restoreUser,
  toggleUserStatus,
};
