// ========================================
// config/email.config.js
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
 * CLIENTE HTTP DE ENVÍO (COMPONENTE PURO)
 * ==================================== */
const sendEmail = async ({ to, subject, html, text = null }) => {
    if (!process.env.BREVO_API_KEY) {
        throw new Error("Servicio de Email no disponible (Falta BREVO_API_KEY).");
    }

    try {
        console.log(`=> [Brevo API] Intentando enviar a: ${to} | Asunto: ${subject}`);

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

        console.log(`=> [Brevo API] ¡Enviado con éxito! ID: ${data.messageId}`);
        return data;

    } catch (error) {
        console.error("❌ ERROR EN CLIENTE EMAIL VÍA API:", error.message || error);
        throw error;
    }
};

module.exports = {
    sendEmail
};