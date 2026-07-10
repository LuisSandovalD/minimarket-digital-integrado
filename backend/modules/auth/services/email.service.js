// ========================================
// services/email.service.js
// ========================================

require("dotenv").config();
const nodemailer = require("nodemailer");
const dns = require("dns");

/* ======================================
 * DNS TEST SMTP
 * ==================================== */
dns.lookup(
    process.env.SMTP_HOST || "smtp-relay.brevo.com",
    { all: true },
    (err, addresses) => {
        console.log("=================================");
        console.log("DNS RESULT SMTP");
        console.log("=================================");
        if (err) {
            console.error("DNS ERROR:", err);
        } else {
            console.log("ADDRESSES:", addresses);
        }
        console.log("=================================");
    }
);

/* ======================================
 * VALIDAR VARIABLES SMTP
 * ==================================== */
function validateSMTP() {
    const required = [
        "SMTP_HOST",
        "SMTP_PORT",
        "SMTP_USER",
        "SMTP_PASS",
        "SMTP_FROM"
    ];

    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        console.error("=================================");
        console.error("SMTP CONFIGURATION ERROR");
        console.error("=================================");
        console.error("Faltan variables:", missing.join(", "));
        console.error("=================================");
        return false;
    }
    return true;
}

/* ======================================
 * MOSTRAR CONFIGURACIÓN
 * ==================================== */
console.log("=================================");
console.log("SMTP CONFIGURATION");
console.log("=================================");
console.log("HOST:", process.env.SMTP_HOST || "NO CONFIGURADO");
console.log("PORT:", process.env.SMTP_PORT || "NO CONFIGURADO");
console.log("USER:", process.env.SMTP_USER || "NO CONFIGURADO");
console.log("FROM:", process.env.SMTP_FROM || "NO CONFIGURADO");
console.log("PASSWORD:", process.env.SMTP_PASS ? "CONFIGURADA" : "NO CONFIGURADA");
console.log("=================================");

/* ======================================
 * CREAR TRANSPORTER
 * ==================================== */
let transporter = null;

if (validateSMTP()) {
    // Si usas Brevo, apuntamos a su IP directa de relay para saltarnos bloqueos de red/DNS de Render
    const targetHost = process.env.SMTP_HOST === "smtp-relay.brevo.com"
        ? "185.107.232.242"
        : process.env.SMTP_HOST;

    const port = Number(process.env.SMTP_PORT);

    transporter = nodemailer.createTransport({
        host: targetHost,
        port: port,
        // Si usas puerto 465 se activa 'secure: true'. Para puerto 587 se queda en false.
        secure: port === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        // Forzar IPv4 para evitar los problemas de ruteo IPv6 de Render
        family: 4,
        tls: {
            rejectUnauthorized: false,
            minVersion: "TLSv1.2" // Requerido por la infraestructura moderna de Render
        },
        connectionTimeout: 30000, // 30 segundos de margen para evitar el ETIMEDOUT
        greetingTimeout: 30000,
        socketTimeout: 30000,
    });

    transporter.verify((error) => {
        console.log("=================================");
        console.log("SMTP VERIFY");
        console.log("=================================");
        if (error) {
            console.error("SMTP ERROR:");
            console.error(error);
        } else {
            console.log("SMTP READY");
            console.log("Conexión SMTP exitosa con el servidor de correos");
        }
        console.log("=================================");
    });
}

/* ======================================
 * ENVIAR CORREO
 * ==================================== */
const sendEmail = async ({ to, subject, html, text = null }) => {
    if (!transporter) {
        throw new Error("Servicio SMTP no disponible debido a un error de configuración.");
    }

    try {
        console.log("=================================");
        console.log("INTENTANDO ENVIAR CORREO");
        console.log("TO:", to);
        console.log("SUBJECT:", subject);
        console.log("=================================");

        const info = await transporter.sendMail({
            from: `"ERP POS System" <${process.env.SMTP_FROM}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("=================================");
        console.log("EMAIL ENVIADO EXITOSAMENTE");
        console.log("MESSAGE ID:", info.messageId);
        console.log("RESPONSE:", info.response);
        console.log("=================================");

        return info;
    } catch (error) {
        console.error("=================================");
        console.error("ERROR ENVIANDO EMAIL");
        console.error(error);
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