const repository = require("../repositories/branch.repository");
const { sendEmail } = require("../../../config/email.config");

const sendBranchCreatedEmail = async ({ email, name, code, address }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: `Nueva Sucursal Registrada - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb;">¡Sucursal Creada con Éxito!</h2>
        <p>Se ha registrado oficialmente una nueva sucursal en el sistema comercial:</p>
        <ul style="list-style-type: none; padding: 0;">
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Código:</strong> ${code || "No asignado"}</li>
          <li><strong>Dirección:</strong> ${address || "No especificada"}</li>
        </ul>
        <p>A partir de este momento, ya se pueden gestionar inventarios y operaciones en esta locación.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje automático, por favor no respondas directamente a él.</small>
      </div>
    `,
  });
};

const sendBranchUpdatedEmail = async ({ email, name, code }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: `Actualización de Datos - Sucursal ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb;">Información de Sucursal Modificada</h2>
        <p>Se te notifica que los datos comerciales de la sucursal <strong>${name}</strong> (Código: ${code || "N/A"}) han sido actualizados en la plataforma.</p>
        <p>Si no reconoces esta modificación, ponte en contacto con el administrador principal del sistema.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje automático, por favor no respondas directamente a él.</small>
      </div>
    `,
  });
};

const sendBranchDeletedEmail = async ({ email, name, code }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: `Baja de Sucursal - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #ef4444;">Sucursal Desactivada</h2>
        <p>Te notificamos que la sucursal <strong>${name}</strong> (Código: ${code || "N/A"}) ha sido dada de baja o desactivada de la plataforma.</p>
        <p>Las operaciones comerciales en esta locación han quedado suspendidas temporalmente.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje automático, por favor no respondas directamente a él.</small>
      </div>
    `,
  });
};

exports.createBranch = async (data, companyId) => {
  if (!data.name) {
    throw new Error("El nombre es obligatorio");
  }

  const newBranch = await repository.create({
    name: data.name,
    code: data.code ?? null,
    logo: data.logo ?? null,
    description: data.description ?? null,
    address: data.address ?? null,
    phone: data.phone ?? null,
    email: data.email ?? null,
    city: data.city ?? null,
    state: data.state ?? null,
    country: data.country ?? null,
    postalCode: data.postalCode ?? null,
    companyId: Number(companyId),
  });

  if (newBranch.email) {
    try {
      await sendBranchCreatedEmail({
        email: newBranch.email,
        name: newBranch.name,
        code: newBranch.code,
        address: newBranch.address,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de creación de sucursal:", emailError.message || emailError);
    }
  }

  return newBranch;
};

exports.updateBranch = async (id, data, companyId) => {
  const branchId = Number(id);

  if (isNaN(branchId)) {
    throw new Error("ID inválido");
  }

  const branch = await repository.findById(branchId, Number(companyId));

  if (!branch) {
    throw new Error("Sucursal no encontrada");
  }

  const updateData = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.code !== undefined) updateData.code = data.code;
  if (data.logo !== undefined) updateData.logo = data.logo;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.city !== undefined) updateData.city = data.city;
  if (data.state !== undefined) updateData.state = data.state;
  if (data.country !== undefined) updateData.country = data.country;
  if (data.postalCode !== undefined) updateData.postalCode = data.postalCode;
  if (data.isActive !== undefined) {
    updateData.isActive = data.isActive === true || String(data.isActive).toLowerCase() === "true";
  }

  const updatedBranch = await repository.update(branchId, updateData);

  const targetEmail = updatedBranch.email || branch.email;
  if (targetEmail) {
    try {
      await sendBranchUpdatedEmail({
        email: targetEmail,
        name: updatedBranch.name,
        code: updatedBranch.code,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de actualización de sucursal:", emailError.message || emailError);
    }
  }

  return updatedBranch;
};

exports.deleteBranch = async (id, companyId) => {
  const branchId = Number(id);

  if (isNaN(branchId)) {
    throw new Error("ID inválido");
  }

  const branch = await repository.findById(branchId, Number(companyId));

  if (!branch) {
    throw new Error("Sucursal no encontrada");
  }

  const deletedBranch = await repository.softDelete(branchId);

  if (branch.email) {
    try {
      await sendBranchDeletedEmail({
        email: branch.email,
        name: branch.name,
        code: branch.code,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de eliminación de sucursal:", emailError.message || emailError);
    }
  }

  return deletedBranch;
};
