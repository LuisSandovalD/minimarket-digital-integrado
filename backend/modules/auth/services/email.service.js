// ========================================
// services/email.service.js
// ========================================

// Asegúrate de instalar dotenv (npm i dotenv) si manejas un archivo .env
require("dotenv").config();
const nodemailer = require("nodemailer");
const dns = require("dns");

/* ======================================
 * DNS TEST SMTP
 * ==================================== */
dns.lookup(
    process.env.SMTP_HOST || "smtp.gmail.com",
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
        "SMTP_FROM" // Añadido como requerido
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
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        // Brevo usa STARTTLS en el puerto 587, por ende secure debe ser false
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        family: 4, // Fuerza IPv4
        tls: {
            // Brevo a veces requiere mantener esto en false en entornos locales
            rejectUnauthorized: false,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 15000,
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
            console.log("Conexión SMTP exitosa con Brevo");
        }
        console.log("=================================");
    });
}

/* ======================================
 * ENVIAR CORREO
 * ==================================== */
const sendEmail = async ({ to, subject, html, text = null }) => {
    if (!transporter) {
        throw new Error("Servicio SMTP no disponible.");
    }

    try {
        console.log("=================================");
        console.log("INTENTANDO ENVIAR CORREO");
        console.log("TO:", to);
        console.log("SUBJECT:", subject);
        console.log("=================================");

        const info = await transporter.sendMail({
            // CORRECCIÓN AQUÍ: Se usa SMTP_FROM en lugar de SMTP_USER
            from: `"ERP POS System" <${process.env.SMTP_FROM}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("=================================");
        console.log("EMAIL ENVIADO");
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
 * REUSAR MÉTODOS EXISTENTES
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