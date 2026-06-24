// ========================================
// services/email.service.js
// ========================================

const nodemailer = require("nodemailer");

/* ======================================
 * VALIDACIÓN DE VARIABLES
 * ==================================== */
if (!process.env.SMTP_HOST) {
    throw new Error("SMTP_HOST no configurado");
}

if (!process.env.SMTP_PORT) {
    throw new Error("SMTP_PORT no configurado");
}

if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER no configurado");
}

if (!process.env.SMTP_PASS) {
    throw new Error("SMTP_PASS no configurado");
}

/* ======================================
 * CONFIGURACIÓN SMTP
 * ==================================== */
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },

    tls: {
        rejectUnauthorized: false
    }
});

/* ======================================
 * VERIFICACIÓN SMTP AL INICIAR
 * ==================================== */
(async () => {
    try {

        console.log("=================================");
        console.log("SMTP CONFIGURATION");
        console.log("=================================");
        console.log("HOST:", process.env.SMTP_HOST);
        console.log("PORT:", process.env.SMTP_PORT);
        console.log("USER:", process.env.SMTP_USER);
        console.log(
            "PASSWORD:",
            process.env.SMTP_PASS
                ? "CONFIGURADA"
                : "NO CONFIGURADA"
        );

        await transporter.verify();

        console.log("=================================");
        console.log("SMTP READY");
        console.log("Conexión con Gmail exitosa");
        console.log("=================================");

    } catch (error) {

        console.error("=================================");
        console.error("SMTP ERROR");
        console.error("=================================");
        console.error(error);
        console.error("=================================");

    }
})();

/* ======================================
 * ENVIAR CORREO
 * ==================================== */
const sendEmail = async ({
    to,
    subject,
    html,
    text = null
}) => {

    const info =
        await transporter.sendMail({
            from: `"ERP POS System" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html
        });

    console.log(
        `Correo enviado correctamente: ${info.messageId}`
    );

    return info;
};

/* ======================================
 * RECUPERACIÓN DE CONTRASEÑA
 * ==================================== */
const sendPasswordResetCode = async ({
    email,
    code
}) => {

    return sendEmail({
        to: email,
        subject: "Recuperación de contraseña",
        html: `
            <div style="font-family: Arial, sans-serif; padding:20px;">
                
                <h2>Recuperación de contraseña</h2>

                <p>
                    Hemos recibido una solicitud para restablecer tu contraseña.
                </p>

                <p>
                    Utiliza el siguiente código:
                </p>

                <div
                    style="
                        font-size:32px;
                        font-weight:bold;
                        letter-spacing:6px;
                        color:#2563eb;
                        margin:20px 0;
                    "
                >
                    ${code}
                </div>

                <p>
                    Este código expirará en 15 minutos.
                </p>

                <p>
                    Si no realizaste esta solicitud,
                    simplemente ignora este mensaje.
                </p>

                <hr>

                <small>
                    ERP POS System
                </small>

            </div>
        `
    });
};

/* ======================================
 * CÓDIGO DE VERIFICACIÓN EN DOS PASOS
 * ==================================== */
const sendTwoFactorCode = async (
    email,
    code
) => {

    return sendEmail({
        to: email,
        subject: "Tu código de verificación",
        html: `
            <div style="font-family: Arial, sans-serif; padding:20px;">

                <h2>Verificación en dos pasos</h2>

                <p>
                    Detectamos un inicio de sesión en tu cuenta.
                    Utiliza el siguiente código para completarlo:
                </p>

                <div
                    style="
                        font-size:32px;
                        font-weight:bold;
                        letter-spacing:6px;
                        color:#2563eb;
                        margin:20px 0;
                    "
                >
                    ${code}
                </div>

                <p>
                    Este código expirará en 10 minutos.
                </p>

                <p>
                    Si no fuiste tú quien intentó iniciar sesión,
                    cambia tu contraseña de inmediato.
                </p>

                <hr>

                <small>
                    ERP POS System
                </small>

            </div>
        `
    });
};

module.exports = {
    sendEmail,
    sendPasswordResetCode,
    sendTwoFactorCode
};