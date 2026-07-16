// ========================================
// utils/tokenLimiter.js
// ========================================

/**
 * Convierte tipos de datos complejos de Prisma (como Decimal o BigInt)
 * a tipos primitivos nativos de JavaScript (números y strings).
 */
const serializePrismaData = (data) => {
  if (data === null || data === undefined) return data;

  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      // Manejo nativo de BigInt (IDs de tablas pesadas o contadores)
      if (typeof value === "bigint") {
        return value.toString();
      }

      // Manejo robusto de Decimal (Campos numéricos/monetarios de Prisma)
      if (value && (value.constructor?.name === "Decimal" || value.s !== undefined && value.e !== undefined)) {
        return parseFloat(value.toString());
      }

      return value;
    }),
  );
};
/**
 * Recorta de forma inteligente el volumen de datos en el payload.
 * Si recibe un Array, toma los primeros 'maxElements'.
 * Si recibe un Objeto (como el snapshot del ERP), itera sobre sus módulos internos
 * y recorta sus arrays de forma independiente para proteger el contexto y la velocidad.
 */
const limitContextPayload = (data, maxElements = 15) => {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.slice(0, maxElements);
  }

  if (typeof data === "object") {
    const limitedObject = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        if (Array.isArray(value)) {
          limitedObject[key] = value.slice(0, maxElements);
        } else if (value !== null && typeof value === "object") {
          limitedObject[key] = limitContextPayload(value, maxElements);
        } else {
          limitedObject[key] = value;
        }
      }
    }
    return limitedObject;
  }

  return data;
};

module.exports = {
  serializePrismaData,
  limitContextPayload,
};
