// ========================================
// services/auth/login.service.js
// ========================================

const bcrypt = require("bcryptjs");

// Importación explícita de los sub-repositorios atómicos especializados
const userRepository = require("../repositories/user.repository");
const userAuthRepository = require("../repositories/user-auth.repository");
const user2FARepository = require("../repositories/user-2fa.repository");
const sessionRepository = require("../repositories/session.repository");

// Otros servicios requeridos
const tokenService = require("./token.service");

// CONFIGURACIÓN CENTRALIZADA DE ENVÍO DE CORREOS (BREVO API)
const { sendEmail } = require("../../../config/email.config");

const {
    MAX_LOGIN_ATTEMPTS,
    ACCOUNT_LOCK_MINUTES
} = require("../constants/auth.constants");

const login = async (email, password, ipAddress = null, userAgent = null) => {

    if (!email || !password) {
        throw new Error("El correo electrónico y la contraseña son requeridos");
    }

    // 1. Buscar usuario en el repositorio central de usuarios
    const user = await userRepository.findUserByEmail(email.trim().toLowerCase());

    if (!user) {
        throw new Error("Credenciales incorrectas");
    }

    // 2. Verificar si la cuenta está bajo una ventana de bloqueo activa
    if (user.lockedUntil && user.lockedUntil > new Date()) {
        const minutos = Math.ceil(
            (user.lockedUntil - new Date()) / (1000 * 60)
        );

        throw new Error(
            `Cuenta bloqueada temporalmente. Intente nuevamente en ${minutos} minutos`
        );
    }

    // 3. Validar hash de contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const attempts = (user.loginAttempts || 0) + 1;

        if (attempts >= MAX_LOGIN_ATTEMPTS) {
            const lockDate = new Date(
                Date.now() + ACCOUNT_LOCK_MINUTES * 60 * 1000
            );

            // Bloquear usuario de forma segura
            await userAuthRepository.lockUser(user.id, lockDate);

            throw new Error(
                `Demasiados intentos fallidos. La cuenta ha sido bloqueada por ${ACCOUNT_LOCK_MINUTES} minutos`
            );
        }

        // Incrementar el contador de reintentos fallidos en el repositorio de autenticación
        await userAuthRepository.incrementLoginAttempts(user.id);

        throw new Error("Credenciales incorrectas");
    }

    /* ======================================
     * ESCENARIO A: VERIFICACIÓN EN DOS PASOS (2FA)
     * ==================================== */
    if (user.twoFactorEnabled) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Guardamos el código OTP temporal utilizando el repositorio específico de 2FA
        await user2FARepository.saveTwoFactorCode(user.id, code, expiresAt);

        console.log(`🔒 [2FA GENERATED] (${user.email}): ${code}`);

        // Despachamos el correo electrónico de forma asíncrona usando Brevo API
        sendEmail({
            to: user.email,
            subject: `🔑 ${code} es tu código de verificación de seguridad`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #2563eb; margin: 0;">Verificación de Seguridad (2FA)</h2>
                        <p style="color: #64748b; font-size: 14px;">Inicios de sesión protegidos - ERP POS System</p>
                    </div>
                    
                    <p>Hola. Se ha solicitado un código de acceso para ingresar a tu cuenta de usuario.</p>
                    <p>Introduce el siguiente código temporal en la pantalla de verificación de tu navegador:</p>
                    
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 1px dashed #cbd5e1;">
                        <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e293b;">${code}</span>
                    </div>

                    <p style="font-size: 13px; color: #ef4444; font-weight: bold;">⚠️ Este código expirará en 10 minutos y solo puede ser utilizado una vez.</p>
                    
                    <div style="background-color: #fffbeb; padding: 12px; border-left: 4px solid #f59e0b; border-radius: 4px; margin-top: 15px; font-size: 13px; color: #78350f;">
                        <strong>¿No fuiste tú?</strong> Si no estabas intentando iniciar sesión en este momento, ignora este mensaje y te sugerimos cambiar tu contraseña de inmediato.
                    </div>

                    <br>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                    <small style="color: #94a3b8;">Seguridad de Accesos • ERP POS System</small>
                </div>
            `
        }).catch(emailError => {
            console.error("⚠️ Falló el envío de la clave OTP 2FA vía Brevo:", emailError.message || emailError);
        });

        // Retornamos control al cliente avisando que el flujo está incompleto (A la espera del token)
        return {
            success: true,
            requires2FA: true,
            userId: user.id
        };
    }

    /* ======================================
     * ESCENARIO B: LOGIN DIRECTO (SIN 2FA)
     * ==================================== */

    // 4. Automatización del estado del usuario (isOnline, reset de intentos, etc.)
    await userRepository.handleSuccessfulLoginState(user.id);

    // 5. Emisión de credenciales mediante el servicio de tokens
    const tokens = tokenService.generateTokens(user);

    // Tiempos de expiración sincronizados con la firma de tus JWT para persistir en DB
    const accessExpiresIn = new Date(Date.now() + 15 * 60 * 1000);           // 15 Minutos de vida
    const refreshExpiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 Días de vida

    // 6. Inserción automática y obligatoria de la sesión del dispositivo en public.UserSession
    await sessionRepository.createSession({
        userId: user.id,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        ipAddress,
        userAgent,
        expiresAt: accessExpiresIn,
        refreshExpiresAt: refreshExpiresIn
    });

    // 📬 ALERTA DE NUEVO INICIO DE SESIÓN EXITOSO (SIN AWAIT)
    if (user.email) {
        sendEmail({
            to: user.email,
            subject: "ℹ️ Notificación de seguridad: Nuevo inicio de sesión detectado",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <h2 style="color: #1e293b; margin-top: 0;">Nuevo inicio de sesión</h2>
                    <p>Hola, <strong>${user.name || 'Usuario'}</strong>.</p>
                    <p>Te informamos que se acaba de registrar un acceso exitoso a tu cuenta en la plataforma **ERP POS System**.</p>
                    
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #cbd5e1; font-size: 14px; color: #334155;">
                        <p style="margin: 4px 0;"><strong>Fecha y Hora:</strong> ${new Date().toLocaleString()}</p>
                        <p style="margin: 4px 0;"><strong>Dirección IP:</strong> ${ipAddress || 'No detectada'}</p>
                        <p style="margin: 4px 0;"><strong>Dispositivo / Agente:</strong> <span style="font-size: 12px; color: #64748b;">${userAgent || 'Desconocido'}</span></p>
                    </div>

                    <div style="background-color: #fffbeb; padding: 12px; border-left: 4px solid #f59e0b; border-radius: 4px; margin-top: 15px; font-size: 13px; color: #78350f;">
                        <strong>¿Fuiste tú?</strong> Si reconoces esta actividad, puedes ignorar este correo de forma segura. Si sospechas que alguien más ha ingresado a tu cuenta, te recomendamos cambiar tu contraseña inmediatamente desde tu perfil.
                    </div>

                    <br>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                    <small style="color: #94a3b8;">Seguridad de Accesos • ERP POS System</small>
                </div>
            `
        }).catch(emailError => {
            console.error("⚠️ Falló el envío de la notificación de login vía Brevo:", emailError.message || emailError);
        });
    }

    return {
        success: true,
        requires2FA: false,
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    };
};

module.exports = {
    login
};