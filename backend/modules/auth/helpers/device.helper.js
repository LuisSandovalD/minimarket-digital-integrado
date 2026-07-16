// ========================================
// helpers/device.helper.js
// ========================================

const UAParser = require("ua-parser-js");

/**
 * Extrae la información detallada del dispositivo, sistema operativo
 * y navegador a partir de una petición de Express.
 * * @param {Object} req - Objeto de petición de Express (Request)
 * @returns {Object} Datos formateados del dispositivo e IP
 */
exports.getDeviceInfo = (req) => {
  if (!req) {
    return {
      ip: "0.0.0.0",
      userAgent: "Unknown",
      browser: "Unknown",
      os: "Unknown",
      deviceType: "Unknown",
    };
  }

  // 1. Obtener la dirección IP real (considerando Proxies o Cloudflare)
  const ip =
        req.headers["cf-connecting-ip"] ||          // Cloudflare
        req.headers["x-forwarded-for"]?.split(",")[0] || // Proxies concurrentes
        req.socket.remoteAddress ||                  // Conexión directa TCP
        "0.0.0.0";

  // 2. Obtener el User-Agent crudo
  const userAgent = req.headers["user-agent"] || "";

  // 3. Parsear el User-Agent con ua-parser-js
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  // 4. Formatear nombres legibles
  const browserName = result.browser.name ? `${result.browser.name} ${result.browser.version || ""}`.trim() : "Unknown Browser";
  const osName = result.os.name ? `${result.os.name} ${result.os.version || ""}`.trim() : "Unknown OS";

  // Determinar el tipo de dispositivo (desktop, mobile, tablet, etc.)
  const deviceType = result.device.type || "desktop";

  return {
    ip,
    userAgent,
    browser: browserName,
    os: osName,
    deviceType: deviceType,
  };
};
