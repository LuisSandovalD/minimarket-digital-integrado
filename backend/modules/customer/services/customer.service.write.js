const repository = require("../repositories/customer.repository");
const { sendEmail } = require("../../../config/email.config");

const sendCustomerWelcomeEmail = async ({ email, name, creditLimit }) => {
  if (!email) return;

  const formattedLimit = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(creditLimit || 0));

  return await sendEmail({
    to: email,
    subject: "¡Bienvenido! - Registro de Cliente Exitoso",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb;">¡Hola, ${name}!</h2>
        <p>Te informamos que has sido registrado exitosamente como cliente en nuestra plataforma.</p>
        <p>Tu cuenta se encuentra activa y tienes asignado un límite de crédito inicial de: <strong>${formattedLimit}</strong>.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje automático, por favor no respondas directamente a él.</small>
      </div>
    `,
  });
};

const sendCustomerUpdateEmail = async ({ email, name }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: "Actualización de Datos - Notificación",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb;">Estimado(a) ${name},</h2>
        <p>Te notificamos que la información de tu cuenta de cliente ha sido actualizada recientemente en nuestro sistema.</p>
        <p>Si no reconoces esta actividad o crees que se trata de un error, por favor ponte en contacto con la administración.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje automático, por favor no respondas directamente a él.</small>
      </div>
    `,
  });
};

const sendCustomerDeleteEmail = async ({ email, name }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: "Baja de Cliente - Cuenta Eliminada",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #ef4444;">Aviso de Cancelación de Cuenta</h2>
        <p>Estimado(a) ${name},</p>
        <p>Te notificamos que tu registro como cliente en nuestro sistema ha sido dado de baja de forma definitiva.</p>
        <p>Agradecemos tu tiempo con nosotros. Si consideras que esto se trata de un malentendido, ponte en contacto con nuestro equipo de soporte técnico inmediatamente.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje automático, por favor no respondas directamente a él.</small>
      </div>
    `,
  });
};

exports.create = async (data) => {
  if (!data.name) {
    throw new Error("El nombre es obligatorio");
  }

  const newCustomer = await repository.create(data);

  if (newCustomer.email) {
    try {
      await sendCustomerWelcomeEmail({
        email: newCustomer.email,
        name: newCustomer.name,
        creditLimit: newCustomer.creditLimit,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de bienvenida:", emailError.message || emailError);
    }
  }

  return newCustomer;
};

exports.update = async (id, companyId, data) => {
  if (Number.isNaN(Number(id))) {
    throw new Error("ID inválido");
  }

  const customer = await repository.getById(id, companyId);

  if (!customer) {
    throw new Error("Cliente no encontrado");
  }

  const updateData = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.documentType !== undefined) updateData.documentType = data.documentType;
  if (data.documentNumber !== undefined) updateData.documentNumber = data.documentNumber;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.city !== undefined) updateData.city = data.city;
  if (data.state !== undefined) updateData.state = data.state;
  if (data.country !== undefined) updateData.country = data.country;
  if (data.postalCode !== undefined) updateData.postalCode = data.postalCode;
  if (data.notes !== undefined) updateData.notes = data.notes;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.creditLimit !== undefined) updateData.creditLimit = data.creditLimit !== null ? Number(data.creditLimit) : 0;
  if (data.currentDebt !== undefined) updateData.currentDebt = data.currentDebt !== null ? Number(data.currentDebt) : 0;

  const updatedCustomer = await repository.update(id, updateData);

  const targetEmail = updatedCustomer.email || customer.email;
  if (targetEmail) {
    try {
      await sendCustomerUpdateEmail({
        email: targetEmail,
        name: updatedCustomer.name,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de actualización:", emailError.message || emailError);
    }
  }

  return updatedCustomer;
};

exports.delete = async (id, companyId) => {
  if (Number.isNaN(Number(id))) {
    throw new Error("ID inválido");
  }

  const customer = await repository.getById(id, companyId);

  if (!customer) {
    throw new Error("Cliente no encontrado");
  }

  const deletedCustomer = await repository.delete(id);

  if (customer.email) {
    try {
      await sendCustomerDeleteEmail({
        email: customer.email,
        name: customer.name,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de eliminación:", emailError.message || emailError);
    }
  }

  return deletedCustomer;
};
