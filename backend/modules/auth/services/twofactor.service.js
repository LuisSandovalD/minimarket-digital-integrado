// ========================================
// services/auth/twofactor.service.js
// ========================================

const bcrypt = require("bcryptjs");
const speakeasy = require("speakeasy"); // Librería estándar para TOTP
const QRCode = require("qrcode");       // Generador de códigos QR

// Importación explícita de sub-repositorios especializados
const userRepository = require("../repositories/user.repository");
const user2FARepository = require("../repositories/user-2fa.repository");
const sessionRepository = require("../repositories/session.repository");

const tokenService = require("./token.service");

// CONFIGURACIÓN CENTRALIZADA DE ENVÍO DE CORREOS (BREVO API)
const { sendEmail } = require("../../../config/email.config");

/* ======================================
 * GENERAR SECRETO 2FA (TOTP para App Móvil)
 * ==================================== */
const generateTwoFactorSecret = async (userId) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    // Generar un secreto único basado en base32
    const secret = speakeasy.generateSecret({
        name: `TuEmpresa Corporativo (${user.email})`,
    });

    // Generar la representación visual en código QR (Data URL Base64)
    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);

    // Guardar temporalmente el secreto en la base de datos (Columna: twoFactorSecret)
    await user2FARepository.saveTempTwoFactorSecret(userId, secret.base32);

    return {
        success: true,
        secret: secret.base32,
        qrCode: qrCodeDataUrl // Pintar en el frontend con <img src={qrCode} />
    };
};

/* ======================================
 * CONFIRMAR Y ACTIVAR 2FA (Seguro)
 * ==================================== */
const verifyAndEnableTwoFactor = async (userId, password, token) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    // 1. Validar identidad por contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Contraseña incorrecta");
    }

    // 2. Validar que el secreto temporal exista en la cuenta
    if (!user.twoFactorSecret) {
        throw new Error("No se ha inicializado la configuración del segundo factor. Solicita un nuevo QR.");
    }

    // 3. SEGURO: Validar que el token del App corresponda matemáticamente al secreto guardado
    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: "base32",
        token: token,
        window: 1 // Ventana de tolerancia de 30s previos/posteriores por retrasos de reloj
    });

    if (!verified) {
        throw new Error("Código de verificación inválido. Revisa el reloj de tu dispositivo.");
    }

    // 4. Activar formalmente el flag en la BD
    await user2FARepository.enableTwoFactorAuth(userId);

    // 📬 Notificación asíncrona de confirmación de activación
    if (user.email) {
        sendEmail({
            to: user.email,
            subject: "🔒 Verificación en Dos Pasos Activada con Éxito",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <h2 style="color: #16a34a;">¡Cuenta Protegida!</h2>
                    <p>Hola, ${user.name}. Te confirmamos que has enlazado correctamente tu cuenta con una aplicación autenticadora (Google Authenticator / Authy).</p>
                    <p>A partir de ahora, tu acceso requerirá tanto tu contraseña como el código dinámico generado por tu dispositivo móvil.</p>
                    <br>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                    <small style="color: #94a3b8;">Seguridad de Accesos • ERP POS System</small>
                </div>
            `
        }).catch(err => console.error("⚠️ Error notificando activación de QR 2FA:", err.message));
    }

    return {
        success: true,
        message: "Verificación en dos pasos activada correctamente"
    };
};

/* ======================================
 * DESACTIVAR 2FA
 * ==================================== */
const disableTwoFactor = async (userId, password) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Contraseña incorrecta");
    }

    await user2FARepository.disableTwoFactorAuth(userId);

    // 📬 Alerta de seguridad asíncrona por desactivación
    if (user.email) {
        sendEmail({
            to: user.email,
            subject: "⚠️ ADVERTENCIA: Verificación en Dos Pasos Desactivada",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <h2 style="color: #dc2626;">Aviso de Seguridad Crítico</h2>
                    <p>Hola, ${user.name}. Te informamos que la verificación en dos pasos (2FA) ha sido **desactivada** en tu cuenta.</p>
                    
                    <div style="background-color: #fef2f2; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #dc2626;">
                        <p style="margin: 0; color: #991b1b; font-weight: bold;">¿No fuiste tú?</p>
                        <p style="margin: 4px 0 0 0; color: #7f1d1d; font-size: 14px;">Si un tercero realizó esta acción, tu cuenta está en peligro. Ingresa inmediatamente al sistema, cambia tu clave y vuelve a habilitar el segundo factor.</p>
                    </div>
                    <br>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                    <small style="color: #94a3b8;">Seguridad de Accesos • ERP POS System</small>
                </div>
            `
        }).catch(err => console.error("⚠️ Error notificando desactivación de 2FA:", err.message));
    }

    return {
        success: true,
        message: "Verificación en dos pasos desactivada correctamente"
    };
};

/* ======================================
 * VALIDAR SEGUNDO PASO EN EL LOGIN (Mecanismo Híbrido)
 * ==================================== */
const loginStepTwoFA = async (userId, token, ipAddress = null, userAgent = null) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    let isVerified = false;

    // 📬 INTENTO 1: Verificar si coincide con el código enviado por CORREO ELECTRÓNICO
    const validEmailUser = await user2FARepository.findValidTwoFactorCode(userId, token);

    if (validEmailUser) {
        isVerified = true;
        await user2FARepository.clearTwoFactorCode(userId);
    }

    // 📱 INTENTO 2: Si no fue código de correo, probamos con Google Authenticator (TOTP)
    if (!isVerified && user.twoFactorEnabled && user.twoFactorSecret) {
        const verifiedTOTP = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: "base32",
            token: token,
            window: 1
        });

        if (verifiedTOTP) {
            isVerified = true;
        }
    }

    // 🚨 Si no pasó ninguna de las dos validaciones, rebota la petición
    if (!isVerified) {
        throw new Error("Código de verificación incorrecto o expirado");
    }

    // ========================================================
    // LOG LÓGICA AUTOMÁTICA DE ESTADO Y PERSISTENCIA DE SESIÓN
    // ========================================================
    await userRepository.handleSuccessfulLoginState(user.id);
    const tokens = tokenService.generateTokens(user);

    const accessExpiresIn = new Date(Date.now() + 15 * 60 * 1000);
    const refreshExpiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await sessionRepository.createSession({
        userId: user.id,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        ipAddress,
        userAgent,
        expiresAt: accessExpiresIn,
        refreshExpiresAt: refreshExpiresIn
    });

    return {
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            companyId: user.companyId,
            branchId: user.branchId,
            company: user.company
                ? {
                    id: user.company.id,
                    name: user.company.name,
                    slug: user.company.slug,
                    ruc: user.company.ruc,
                    email: user.company.email,
                    phone: user.company.phone,
                    address: user.company.address,
                    logo: user.company.logo
                }
                : null,
            branch: user.branch
                ? {
                    id: user.branch.id,
                    name: user.branch.name,
                    code: user.branch.code,
                    address: user.branch.address,
                    phone: user.branch.phone,
                    email: user.branch.email
                }
                : null,
            employeeProfile: user.employeeProfile || null
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    };
};

module.exports = {
    generateTwoFactorSecret,
    verifyAndEnableTwoFactor,
    disableTwoFactor,
    loginStepTwoFA
};