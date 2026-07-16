const supplierRepository = require("../repositories/supplier.repository");
const { sendEmail } = require("../../../config/email.config");

const sendSupplierWelcomeEmail = async ({ email, name, contactPerson }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: "¡Bienvenido al Portal de Proveedores! - Registro Exitoso",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb;">¡Hola, ${contactPerson || name}!</h2>
        <p>Le informamos que su empresa <strong>${name}</strong> ha sido registrada exitosamente como proveedor oficial en nuestra plataforma.</p>
        <p>A partir de ahora, utilizaremos esta vía para la gestión de órdenes de compra, requerimientos y coordinación de pagos.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje automático, por favor no responda directamente a él.</small>
      </div>
    `,
  });
};

const sendSupplierUpdateEmail = async ({ email, name, contactPerson }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: "Actualización de Datos de Proveedor",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb;">Estimado(a) ${contactPerson || name},</h2>
        <p>Le notificamos que la ficha de información comercial de <strong>${name}</strong> ha sido actualizada en nuestro sistema de compras e inventario.</p>
        <p>Si no reconoce esta actualización o desea verificar los datos cambiados, por favor póngase en contacto con nuestro departamento de adquisiciones.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje automático, por favor no responda directamente a él.</small>
      </div>
    `,
  });
};

exports.createSupplier = async (data) => {
  const existingSupplier = await supplierRepository.findByName(
    data.name,
    data.companyId,
  );

  if (existingSupplier) {
    throw new Error("Supplier already exists");
  }

  if (data.ruc) {
    const existingRuc = await supplierRepository.findByRuc(
      data.ruc,
      data.companyId,
    );

    if (existingRuc) {
      throw new Error("RUC already registered");
    }
  }

  const newSupplier = await supplierRepository.create({
    name: data.name,
    ruc: data.ruc || null,
    email: data.email || null,
    phone: data.phone || null,
    address: data.address || null,
    contactPerson: data.contactPerson || null,
    website: data.website || null,
    notes: data.notes || null,
    currentDebt: data.currentDebt || 0,
    companyId: Number(data.companyId),
  });

  if (newSupplier.email) {
    try {
      await sendSupplierWelcomeEmail({
        email: newSupplier.email,
        name: newSupplier.name,
        contactPerson: newSupplier.contactPerson,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de bienvenida al proveedor:", emailError.message || emailError);
    }
  }

  return newSupplier;
};

exports.updateSupplier = async (id, companyId, data) => {
  const supplier = await supplierRepository.findById(id, companyId);

  if (!supplier) {
    throw new Error("Supplier not found");
  }

  if (data.name && data.name !== supplier.name) {
    const existingSupplier = await supplierRepository.findByName(
      data.name,
      companyId,
    );

    if (existingSupplier) {
      throw new Error("Supplier name already exists");
    }
  }

  if (data.ruc && data.ruc !== supplier.ruc) {
    const existingRuc = await supplierRepository.findByRuc(
      data.ruc,
      companyId,
    );

    if (existingRuc) {
      throw new Error("RUC already registered");
    }
  }

  await supplierRepository.update(id, companyId, {
    ...(data.name && { name: data.name }),
    ...(data.ruc && { ruc: data.ruc }),
    ...(data.email && { email: data.email }),
    ...(data.phone && { phone: data.phone }),
    ...(data.address && { address: data.address }),
    ...(data.contactPerson && {
      contactPerson: data.contactPerson,
    }),
    ...(data.website && { website: data.website }),
    ...(data.notes && { notes: data.notes }),
    ...(typeof data.isActive === "boolean" && {
      isActive: data.isActive,
    }),
  });

  const updatedSupplier = await supplierRepository.findById(id, companyId);

  const targetEmail = updatedSupplier.email || supplier.email;
  if (targetEmail) {
    try {
      await sendSupplierUpdateEmail({
        email: targetEmail,
        name: updatedSupplier.name,
        contactPerson: updatedSupplier.contactPerson,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de actualización al proveedor:", emailError.message || emailError);
    }
  }

  return updatedSupplier;
};
