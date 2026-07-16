const http = require("http");
const https = require("https");
const { URL } = require("url");

async function fetchImageBuffer(imageUrl) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("data:")) {
    const match = imageUrl.match(/^data:(.+?);base64,(.+)$/);
    if (!match) return null;
    const mime = match[1];
    const base64 = match[2];
    const buffer = Buffer.from(base64, "base64");
    let ext = "png";
    if (mime.includes("jpeg") || mime.includes("jpg")) ext = "jpg";
    if (mime.includes("png")) ext = "png";
    if (mime.includes("svg")) ext = "svg";
    return { buffer, extension: ext, mime };
  }

  let urlObj;
  try {
    urlObj = new URL(imageUrl);
  } catch (err) {
    return null;
  }
  const getter = urlObj.protocol === "http:" ? http : https;
  return new Promise((resolve) => {
    getter
      .get(urlObj.href, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return resolve(null);
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buffer = Buffer.concat(chunks);
          const ctype = res.headers["content-type"] || "";
          let ext = "png";
          if (ctype.includes("jpeg") || ctype.includes("jpg")) ext = "jpg";
          else if (ctype.includes("png")) ext = "png";
          else if (ctype.includes("svg")) ext = "svg";
          else {
            const path = urlObj.pathname || "";
            if (path.match(/\.jpe?g$/i)) ext = "jpg";
            if (path.match(/\.png$/i)) ext = "png";
            if (path.match(/\.svg$/i)) ext = "svg";
          }
          resolve({ buffer, extension: ext, mime: ctype });
        });
      })
      .on("error", () => resolve(null));
  });
}

function safeFormatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("es-PE", { timeZone: "America/Lima", year: "numeric", month: "2-digit", day: "2-digit" });
}

function safeFormatDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return "";
  return d.toLocaleString("es-PE", { timeZone: "America/Lima" });
}

function formatCurrency(v) {
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(v || 0));
}

module.exports = { fetchImageBuffer, safeFormatDate, safeFormatDateTime, formatCurrency };
