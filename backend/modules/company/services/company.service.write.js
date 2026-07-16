const repository = require("../repositories/company.repository");
const { sendEmail } = require("../../../config/email.config");

const sendCompanyWelcomeEmail = async ({ email, companyName }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: `🚀 ¡Bienvenido a ERP POS System! - ${companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
        <h2 style="color: #2563eb; margin-top: 0;">¡Felicidades, tu cuenta SaaS está lista!</h2>
        <p>Queremos dar la bienvenida oficial a <strong>${companyName}</strong> a nuestro ecosistema de gestión comercial inteligente.</p>
        <p>Tu entorno corporativo ha sido provisionado con éxito. Ahora puedes acceder al Panel de Control para configurar tus sucursales, cargar tu inventario inicial y registrar a tus primeros colaboradores.</p>
        <br>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb; text-align: center;">
          <a href="http://localhost:5173/" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #2563eb; text-decoration: none; border-radius: 5px; font-weight: bold;">Ingresar a mi Consola</a>
        </div>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #94a3b8;">Soporte de Cuentas Corporativas - ERP POS System</small>
      </div>
    `,
  });
};

const sendCompanyUpdateEmail = async ({ email, companyName }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: "Actualización de Datos Corporativos - ERP POS System",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
        <h2 style="color: #2563eb; margin-top: 0;">Ficha de Empresa Actualizada</h2>
        <p>Te notificamos que la información legal o comercial de la empresa <strong>${companyName}</strong> ha sido modificada en nuestros registros centrales.</p>
        <p>Si no reconoces estos cambios o crees que se trata de un error de configuración, ponte en contacto de inmediato con nuestro canal oficial de soporte técnico.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #94a3b8;">Soporte de Cuentas Corporativas - ERP POS System</small>
      </div>
    `,
  });
};

const sendCompanySuspensionEmail = async ({ email, companyName }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: `🚨 NOTIFICACIÓN CRÍTICA: Suspensión de Entorno - ${companyName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #fee2e2; border-radius: 8px; background-color: #fef2f2;">
        <h2 style="color: #dc2626; margin-top: 0;">⚠️ Entorno Suspendido Temporalmente</h2>
        <p>Estimado Representante Legal de <strong>${companyName}</strong>,</p>
        <p>Le informamos que el acceso a su entorno corporativo en <strong>ERP POS System</strong> ha sido suspendido temporalmente por la administración.</p>
        <p>Esta medida usualmente responde a factores como la expiración de su plan de suscripción, problemas en el procesamiento de sus cuotas de facturación o una solicitud directa de su parte.</p>
        <p style="font-weight: bold; color: #dc2626;">Durante este periodo, sus colaboradores y sucursales no podrán iniciar sesión ni operar el sistema de facturación.</p>
        <p>Para reactivar sus servicios o consultar el balance pendiente, responda a este correo o escriba a nuestro departamento de administración.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #fca5a5;">
        <small style="color: #7f1d1d;">Departamento de Operaciones y Facturación - ERP POS System</small>
      </div>
    `,
  });
};

// CREAR EMPRESA
exports.create = async (data) => {
  const newCompany = await repository.create(data);

  if (newCompany && newCompany.email) {
    try {
      await sendCompanyWelcomeEmail({
        email: newCompany.email,
        companyName: newCompany.name,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de bienvenida corporativa:", emailError.message || emailError);
    }
  }

  return newCompany;
};

// ACTUALIZAR EMPRESA
exports.update = async (id, data) => {
  const updatedCompany = await repository.update(id, data);

  if (updatedCompany && updatedCompany.email) {
    try {
      await sendCompanyUpdateEmail({
        email: updatedCompany.email,
        companyName: updatedCompany.name,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de actualización corporativa:", emailError.message || emailError);
    }
  }

  return updatedCompany;
};

// ELIMINAR EMPRESA (SOFT DELETE)
exports.softDelete = async (id) => {
  const suspendedCompany = await repository.softDelete(id);

  if (suspendedCompany && suspendedCompany.email) {
    try {
      await sendCompanySuspensionEmail({
        email: suspendedCompany.email,
        companyName: suspendedCompany.name,
      });
    } catch (emailError) {
      console.error("⚠️ Error enviando correo de suspensión de empresa:", emailError.message || emailError);
    }
  }

  return suspendedCompany;
};
