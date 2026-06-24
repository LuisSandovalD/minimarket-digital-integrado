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
const emailService = require("./email.service");

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

        console.log(`2FA CODE (${user.email}): ${code}`);

        // Despachamos el correo electrónico de forma asíncrona
        await emailService.sendTwoFactorCode(user.email, code);

        // Retornamos control al cliente avisando que el flujo está incompleto (A la espera del token)
        // IMPORTANTE: Aquí no se crea sesión ni se cambia a isOnline: true todavía.
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