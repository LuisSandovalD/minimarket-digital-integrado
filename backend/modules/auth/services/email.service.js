// ========================================
// services/email.service.js (Versión API HTTP)
// ========================================

require("dotenv").config();

/* ======================================
 * VALIDAR CONFIGURACIÓN API
 * ==================================== */
function validateAPI() {
    const required = ["BREVO_API_KEY", "SMTP_FROM"];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        console.error("=================================");
        console.error("BREVO CONFIGURATION ERROR");
        console.error("=================================");
        console.error("Faltan variables críticas:", missing.join(", "));
        console.error("=================================");
        return false;
    }
    return true;
}

// Validación inicial al arrancar el servidor
if (validateAPI()) {
    console.log("=================================");
    console.log("BREVO API SYSTEM READY");
    console.log("Usando envío HTTP a través de la API (Sin bloqueos de Render)");
    console.log("=================================");
}

/* ======================================
 * ENVIAR CORREO (VÍA API REST REST)
 * ==================================== */
const sendEmail = async ({ to, subject, html, text = null }) => {
    if (!process.env.BREVO_API_KEY) {
        throw new Error("Servicio de Email no disponible (Falta BREVO_API_KEY).");
    }

    try {
        console.log("=================================");
        console.log("INTENTANDO ENVIAR CORREO VÍA API");
        console.log("TO:", to);
        console.log("SUBJECT:", subject);
        console.log("=================================");

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": process.env.BREVO_API_KEY,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                sender: {
                    name: "ERP POS System",
                    email: process.env.SMTP_FROM
                },
                to: [{ email: to }],
                subject: subject,
                htmlContent: html,
                textContent: text || undefined
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error devuelto por la API de Brevo");
        }

        console.log("=================================");
        console.log("EMAIL ENVIADO EXITOSAMENTE VÍA API");
        console.log("MESSAGE ID:", data.messageId);
        console.log("=================================");

        return data;

    } catch (error) {
        console.error("=================================");
        console.error("ERROR ENVIANDO EMAIL VÍA API");
        console.error(error.message || error);
        console.error("=================================");
        throw error;
    }
};

/* ======================================
 * RECUPERACIÓN DE CONTRASEÑA
 * ==================================== */
const sendPasswordResetCode = async ({ email, code }) => {
    return await sendEmail({
        to: email,
        subject: "Recuperación de contraseña",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Recuperación de contraseña</h2>
                <p>Utiliza el siguiente código:</p>
                <h1 style="color:#2563eb;letter-spacing:8px;">${code}</h1>
                <p>El código expirará en 15 minutos.</p>
                <hr>
                <small>ERP POS System</small>
            </div>
        `,
    });
};

/* ======================================
 * CÓDIGO 2FA
 * ==================================== */
const sendTwoFactorCode = async (email, code) => {
    return await sendEmail({
        to: email,
        subject: "Código de verificación",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Verificación en dos pasos</h2>
                <p>Tu código es:</p>
                <h1 style="color:#2563eb;letter-spacing:8px;">${code}</h1>
                <p>Expira en 10 minutos.</p>
                <hr>
                <small>ERP POS System</small>
            </div>
        `,
    });
};

module.exports = {
    sendEmail,
    sendPasswordResetCode,
    sendTwoFactorCode,
};