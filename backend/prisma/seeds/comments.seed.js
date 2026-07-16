// ============================================================================
// prisma/seeds/comments.seed.js
// Carga de Reviews (calificaciones y comentarios) exclusiva para Don Lucho
// ============================================================================

const prisma = require("../client");

async function commentsSeed() {
  console.log("🚀 Iniciando carga masiva de Reviews para el administrador de Minimarket Don Lucho...");

  // 1. Mapeo exclusivo del único administrador real (Don Lucho)
  const adminEmail = "luissandovalcarbonel@gmail.com";

  // 2. Banco de datos optimizado para Luis Enrique Sandoval Carbonel
  const reviewData = {
    rating: 5,
    comment: "Excelente plataforma para la gestión de inventario de nuestro minimarket en las sedes de Cañete.",
  };

  let totalCreated = 0;

  // Buscar al usuario administrador para obtener su id y el companyId asignado
  const adminUser = await prisma.user.findFirst({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    console.warn(`⚠️ No se encontró al administrador con email: ${adminEmail}. Asegúrate de ejecutar primero admin.seed.js.`);
    return;
  }

  // Evitar duplicados si el seed se vuelve a ejecutar
  const existingReview = await prisma.review.findFirst({
    where: {
      userId: adminUser.id,
      companyId: adminUser.companyId,
    },
  });

  if (existingReview) {
    console.log(`⏩ El administrador ${adminEmail} ya tiene una reseña registrada. Saltando...`);
  } else {
    // 3. Inserción directa en la tabla Review usando sus columnas exactas
    await prisma.review.create({
      data: {
        rating: reviewData.rating,
        comment: reviewData.comment,
        userId: adminUser.id,           // Relación requerida NOT NULL (INTEGER)
        companyId: adminUser.companyId, // Relación requerida NOT NULL (INTEGER)
      },
    });

    totalCreated++;
  }

  console.log("\n====================================");
  console.log(`✅ SEED COMPLETADO: Se cargó con éxito ${totalCreated} reseña en la tabla 'Review'.`);
  console.log("====================================\n");
}

module.exports = {
  commentsSeed,
};
