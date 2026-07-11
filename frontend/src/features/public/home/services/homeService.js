import {
  STATS,
  TRUSTED_LOGOS,
  HOME_HIGHLIGHTS,
} from "../constants/homeData.js";

// Capa de servicios de ejemplo. En produccion aqui se harian las
// llamadas a la API (fetch/axios) para obtener datos dinamicos del Home.

export function getStats() {
  return Promise.resolve(STATS);
}

export function getTrustedLogos() {
  return Promise.resolve(TRUSTED_LOGOS);
}

export function getHighlights() {
  return Promise.resolve(HOME_HIGHLIGHTS);
}
