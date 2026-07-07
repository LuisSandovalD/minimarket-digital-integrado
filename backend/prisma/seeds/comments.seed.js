// ========================================
// prisma/seeds/comments.seed.js
// ========================================

const prisma = require("../client");

async function commentsSeed() {
  console.log("🚀 Iniciando carga masiva de Reviews (calificaciones y comentarios) para los administradores...");

  // 1. Mapeo de los correos de los 20 administradores creados previamente
  const adminEmails = [
    "luissandovalcarbonel@gmail.com",
    "jimmysandoval@gmail.com",
    "maria.lopez@sanjosemed.pe",
    "pedro.ramirez@alimentosdelsur.pe",
    "alondra.mendoza@textilalondra.com",
    "carlos.torres@ferreprogreso.pe",
    "gaston.benavides@saboresdelperu.pe",
    "patricia.salazar@farmavida.pe",
    "ricardo.gomez@horizon.com.pe",
    "lucia.castro@huellitas.pe",
    "jorge.herrera@autocentro.pe",
    "elena.ramos@visionclara.pe",
    "andres.cisneros@cafearoma.pe",
    "sonia.miranda@libreriaminerva.com.pe",
    "manuel.solano@redesnorte.pe",
    "hector.vidal@realcalzado.com",
    "roberto.cavani@ironbody.pe",
    "diana.delafuente@joyassplendor.com",
    "federico.urbina@logisticanorte.pe",
    "claudio.rossi@elbrindis.pe"
  ];

  // 2. Banco de datos con el comentario de texto y su respectivo rating (1 al 5)
  const reviewsFeed = {
    "luissandovalcarbonel@gmail.com": { rating: 5, comment: "Excelente plataforma para la gestión de inventario de nuestro minimarket." },
    "jimmysandoval@gmail.com": { rating: 4, comment: "Muy buen soporte técnico y el módulo de facturación es rápido. Recomendado." },
    "maria.lopez@sanjosemed.pe": { rating: 5, comment: "La interfaz es limpia y nos ayuda a mantener el orden de la administración médica." },
    "pedro.ramirez@alimentosdelsur.pe": { rating: 4, comment: "Nos facilita bastante la distribución, se adapta bien al flujo de provincias." },
    "alondra.mendoza@textilalondra.com": { rating: 5, comment: "Fantástica app, subir variantes de prendas por tallas y colores es sumamente intuitivo." },
    "carlos.torres@ferreprogreso.pe": { rating: 4, comment: "Herramienta robusta, se integra bien con nuestros lectores de códigos en ferretería." },
    "gaston.benavides@saboresdelperu.pe": { rating: 5, comment: "Gran optimización para restaurantes. Agiliza el control de los cierres de caja." },
    "patricia.salazar@farmavida.pe": { rating: 5, comment: "El control de lotes y vencimientos cumple perfectamente las normativas farmacéuticas." },
    "ricardo.gomez@horizon.com.pe": { rating: 4, comment: "Una solución corporativa de alto nivel para gestionar las cuentas e inversiones." },
    "lucia.castro@huellitas.pe": { rating: 5, comment: "Nos encanta el histórico para gestionar de manera recurrente las notas de los clientes." },
    "jorge.herrera@autocentro.pe": { rating: 4, comment: "Buen sistema para el control logístico y talleres automotrices." },
    "elena.ramos@visionclara.pe": { rating: 5, comment: "Sencillo de usar y el soporte responde rápido cuando tenemos dudas con las facturas." },
    "andres.cisneros@cafearoma.pe": { rating: 5, comment: "La compatibilidad con nuestras tiqueteras térmicas en barra es impecable." },
    "sonia.miranda@libreriaminerva.com.pe": { rating: 4, comment: "Excelente control de caja chica y reportes mensuales automatizados." },
    "manuel.solano@redesnorte.pe": { rating: 5, comment: "Ideal para la gestión multiusuario y asignación de permisos a nuestro personal técnico." },
    "hector.vidal@realcalzado.com": { rating: 4, comment: "Sistema estable que nos permite facturar rápidamente en los puntos de venta." },
    "roberto.cavani@ironbody.pe": { rating: 5, comment: "Dinámico y potente. Ha facilitado el control de pagos y membresías de forma notable." },
    "diana.delafuente@joyassplendor.com": { rating: 5, comment: "La carga masiva de productos mediante plantillas nos ahorró semanas de trabajo." },
    "federico.urbina@logisticanorte.pe": { rating: 4, comment: "Muy buen control de entradas, salidas y transferencias entre almacenes." },
    "claudio.rossi@elbrindis.pe": { rating: 5, comment: "Herramienta ágil para ventas rápidas de mostrador y control de inventario diario." }
  };

  let totalCreated = 0;

  for (const email of adminEmails) {
    // Buscar al usuario administrador para obtener su id y el companyId asignado
    const adminUser = await prisma.user.findFirst({
      where: { email }
    });

    if (!adminUser) {
      console.warn(`⚠️ No se encontró al administrador con email: ${email}. Saltando...`);
      continue;
    }

    // Obtener el comentario personalizado o usar uno por defecto si no existe
    const reviewData = reviewsFeed[email] || { rating: 5, comment: "Plataforma muy recomendada y estable para el día a día operativo." };

    // 3. Inserción directa en la tabla Review usando sus columnas exactas
    await prisma.review.create({
      data: {
        rating: reviewData.rating,
        comment: reviewData.comment,
        userId: adminUser.id,        // Relación requerida NOT NULL (INTEGER)
        companyId: adminUser.companyId // Relación requerida NOT NULL (INTEGER)
      }
    });

    totalCreated++;
  }

  console.log(`\n====================================`);
  console.log(`✅ SEED COMPLETADO: Se cargaron con éxito ${totalCreated} reseñas en la tabla 'Review'.`);
  console.log(`====================================\n`);
}

module.exports = {
  commentsSeed
};