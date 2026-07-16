// ========================================
// prisma/seeds/comments.seed.js
// ========================================

const prisma = require("../client");

async function commentsSeed() {
  console.log("🚀 Iniciando carga masiva de Reviews (calificaciones y comentarios) para los 4 administradores...");

  // 1. Mapeo exclusivo de los correos de los 4 administradores creados en admin.seed.js
  const adminEmails = [
    "luissandovalcarbonel@gmail.com",
    "jimmysandoval@gmail.com",
    "maria.lopez@sanjosemed.pe",
    "pedro.ramirez@alimentosdelsur.pe",
  ];

  // 2. Banco de datos optimizado únicamente para los 4 administradores reales
  const reviewsFeed = {
    "luissandovalcarbonel@gmail.com": { rating: 5, comment: "Excelente plataforma para la gestión de inventario de nuestro minimarket." },
    "jimmysandoval@gmail.com": { rating: 4, comment: "Muy buen soporte técnico y el módulo de facturación es rápido. Recomendado." },
    "maria.lopez@sanjosemed.pe": { rating: 5, comment: "La interfaz es limpia y nos ayuda a mantener el orden de la administración médica." },
    "pedro.ramirez@alimentosdelsur.pe": { rating: 4, comment: "Nos facilita bastante la distribución, se adapta bien al flujo de provincias." },
  };

  let totalCreated = 0;

  for (const email of adminEmails) {
    // Buscar al usuario administrador para obtener su id y el companyId asignado
    const adminUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!adminUser) {
      console.warn(`⚠️ No se encontró al administrador con email: ${email}. Saltando...`);
      continue;
    }

    const reviewData = reviewsFeed[email];

    // Evitar duplicados si el seed se vuelve a ejecutar
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: adminUser.id,
        companyId: adminUser.companyId,
      },
    });

    if (existingReview) {
      console.log(`⏩ El administrador ${email} ya tiene una reseña registrada. Saltando...`);
      continue;
    }

    // 3. Inserción directa en la tabla Review usando sus columnas exactas
    await prisma.review.create({
      data: {
        rating: reviewData.rating,
        comment: reviewData.comment,
        userId: adminUser.id,        // Relación requerida NOT NULL (INTEGER)
        companyId: adminUser.companyId, // Relación requerida NOT NULL (INTEGER)
      },
    });

    totalCreated++;
  }

  console.log("\n====================================");
  console.log(`✅ SEED COMPLETADO: Se cargaron con éxito ${totalCreated} reseñas en la tabla 'Review'.`);
  console.log("====================================\n");
}

module.exports = {
  commentsSeed,
};
