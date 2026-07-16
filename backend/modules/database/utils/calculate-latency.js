// modules/database/utils/calculate-latency.js

/*
|--------------------------------------------------------------------------
| Calculate Database Latency
|--------------------------------------------------------------------------
|
| Ejecuta un callback y calcula
| el tiempo de respuesta.
|
*/

async function calculateLatency(
  callback,
) {

  const start = Date.now();

  await callback();

  const end = Date.now();

  return end - start;
}

module.exports =
    calculateLatency;
