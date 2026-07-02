/**
 * Niveles jerárquicos de los planes de suscripción.
 * A mayor número, mayor nivel de privilegios tiene el plan.
 */
export const TIER_LEVELS = {
    FREE: 1,
    BASIC: 2,
    PREMIUM: 3,
};

/**
 * Valida si un plan actual cumple o supera el nivel de plan requerido.
 * * @param {string} currentTier - El plan actual de la empresa (ej. "FREE", "BASIC", "PREMIUM")
 * @param {string} requiredTier - El plan mínimo requerido para acceder al módulo
 * @returns {boolean} True si tiene acceso, False en caso contrario
 */
export const hasTierAccess = (currentTier, requiredTier) => {
    // Si el módulo no requiere ningún plan específico, el acceso es libre
    if (!requiredTier) return true;

    // Obtenemos los valores numéricos correspondientes o usamos el nivel FREE (1) como fallback seguro
    const currentLevel = TIER_LEVELS[currentTier] || TIER_LEVELS.FREE;
    const requiredLevel = TIER_LEVELS[requiredTier] || TIER_LEVELS.FREE;

    return currentLevel >= requiredLevel;
};
