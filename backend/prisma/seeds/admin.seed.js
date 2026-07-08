// ========================================
// prisma/seeds/admin.seed.js
// ========================================

const prisma = require("../client");
const bcrypt = require("bcryptjs");

async function adminSeed() {
  const password = await bcrypt.hash(
    process.env.SEED_PASSWORD || "admin123",
    10
  );

  console.log("🚀 Iniciando carga masiva de 20 empresas y sus administradores...");

  const companiesToSeed = [
    {
      company: {
        name: "Minimarket Don Luchito SAC",
        slug: "minimarket-don-luchito-sac",
        ruc: "20612345678",
        taxId: "20612345678",
        email: "contacto@donluchito.pe",
        phone: "014567890",
        address: "Av. Los Próceres 123, SJL",
        website: "https://donluchito.pe",
        legalRepresentative: "Luis Enrique Sandoval Carbonel",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Luis Enrique Sandoval Carbonel",
        email: "luissandovalcarbonel@gmail.com",
        phone: "934049272"
      }
    },
    {
      company: {
        name: "Corporación Tecnológica Vega E.I.R.L.",
        slug: "corp-tecnologica-vega",
        ruc: "20798765432",
        taxId: "20798765432",
        email: "gerencia@tecnologicavega.com",
        phone: "017894561",
        address: "Jr. Las Flores 456, San Borja",
        website: "https://tecnologicavega.com",
        legalRepresentative: "Jimmy Sandoval Vega",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Jimmy Sandoval Vega",
        email: "jimmysandoval@gmail.com",
        phone: "987999879"
      }
    },
    {
      company: {
        name: "Inversiones Médicas San José",
        slug: "inversiones-medicas-san-jose",
        ruc: "20555666777",
        taxId: "20555666777",
        email: "administracion@sanjosemed.pe",
        phone: "013216549",
        address: "Av. Salaverry 789, Jesús María",
        website: "https://sanjosemed.pe",
        legalRepresentative: "María Fernanda López",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "María Fernanda López",
        email: "maria.lopez@sanjosemed.pe",
        phone: "945678123"
      }
    },
    {
      company: {
        name: "Distribuidora Alimentos del Sur",
        slug: "distribuidora-alimentos-sur",
        ruc: "20444333222",
        taxId: "20444333222",
        email: "ventas@alimentosdelsur.pe",
        phone: "054223344",
        address: "Av. Alfonso Ugarte 512, Arequipa",
        website: "https://alimentosdelsur.pe",
        legalRepresentative: "Pedro Ramírez Soto",
        subscriptionTier: "BASIC"
      },
      admin: {
        name: "Pedro Ramírez Soto",
        email: "pedro.ramirez@alimentosdelsur.pe",
        phone: "912345678"
      }
    },
    {
      company: {
        name: "Boutique Textil Alondra SAC",
        slug: "boutique-textil-alondra",
        ruc: "20601122334",
        taxId: "20601122334",
        email: "hola@textilalondra.com",
        phone: "014758693",
        address: "Jr. Gamarra 820, La Victoria",
        website: "https://textilalondra.com",
        legalRepresentative: "Alondra Mendoza Castro",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Alondra Mendoza Castro",
        email: "alondra.mendoza@textilalondra.com",
        phone: "966554433"
      }
    },
    {
      company: {
        name: "Ferretería El Progreso de Lima",
        slug: "ferreteria-el-progreso",
        ruc: "20519988776",
        taxId: "20519988776",
        email: "ventas@ferreprogreso.pe",
        phone: "013859201",
        address: "Av. Alfredo Mendiola 3450, Los Olivos",
        website: "https://ferreprogreso.pe",
        legalRepresentative: "Carlos Torres Ramos",
        subscriptionTier: "BASIC"
      },
      admin: {
        name: "Carlos Torres Ramos",
        email: "carlos.torres@ferreprogreso.pe",
        phone: "988776655"
      }
    },
    {
      company: {
        name: "Restaurante Sabores del Perú SAC",
        slug: "restaurante-sabores-del-peru",
        ruc: "20604455667",
        taxId: "20604455667",
        email: "reservas@saboresdelperu.pe",
        phone: "012415566",
        address: "Av. La Mar 1020, Miraflores",
        website: "https://saboresdelperu.pe",
        legalRepresentative: "Gastón Benavides Ortiz",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Gastón Benavides Ortiz",
        email: "gaston.benavides@saboresdelperu.pe",
        phone: "911223344"
      }
    },
    {
      company: {
        name: "Farmacias FarmaVida E.I.R.L.",
        slug: "farmacias-farmavida",
        ruc: "20491122445",
        taxId: "20491122445",
        email: "contacto@farmavida.pe",
        phone: "014332211",
        address: "Av. Universitaria 1540, San Miguel",
        website: "https://farmavida.pe",
        legalRepresentative: "Patricia Salazar Vivanco",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Patricia Salazar Vivanco",
        email: "patricia.salazar@farmavida.pe",
        phone: "955443322"
      }
    },
    {
      company: {
        name: "Constructora e Inmobiliaria Horizon",
        slug: "constructora-inmobiliaria-horizon",
        ruc: "20508877331",
        taxId: "20508877331",
        email: "proyectos@horizon.com.pe",
        phone: "016109000",
        address: "Av. Javier Prado Este 2540, San Borja",
        website: "https://horizon.com.pe",
        legalRepresentative: "Ricardo Gómez Paredes",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Ricardo Gómez Paredes",
        email: "ricardo.gomez@horizon.com.pe",
        phone: "944556677"
      }
    },
    {
      company: {
        name: "PetShop & Clínica Veterinaria Huellitas",
        slug: "petshop-veterinaria-huellitas",
        ruc: "20603399112",
        taxId: "20603399112",
        email: "consultas@huellitas.pe",
        phone: "017195420",
        address: "Av. Larco 450, Miraflores",
        website: "https://huellitas.pe",
        legalRepresentative: "Lucía Castro Mendoza",
        subscriptionTier: "BASIC"
      },
      admin: {
        name: "Lucía Castro Mendoza",
        email: "lucia.castro@huellitas.pe",
        phone: "933445566"
      }
    },
    {
      company: {
        name: "Automotriz del Centro SAC",
        slug: "automotriz-del-centro",
        ruc: "20305544889",
        taxId: "20305544889",
        email: "talleres@autocentro.pe",
        phone: "064243510",
        address: "Av. Giraldez 380, Huancayo",
        website: "https://autocentro.pe",
        legalRepresentative: "Jorge Herrera Díaz",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Jorge Herrera Díaz",
        email: "jorge.herrera@autocentro.pe",
        phone: "991188227"
      }
    },
    {
      company: {
        name: "Ópticas Visión Clara SAC",
        slug: "opticas-vision-clara",
        ruc: "20608822441",
        taxId: "20608822441",
        email: "atencion@visionclara.pe",
        phone: "014285940",
        address: "Jr. Carabaya 530, Lima Centro",
        website: "https://visionclara.pe",
        legalRepresentative: "Elena Rostworowski Ramos",
        subscriptionTier: "BASIC"
      },
      admin: {
        name: "Elena Rostworowski Ramos",
        email: "elena.ramos@visionclara.pe",
        phone: "941155223"
      }
    },
    {
      company: {
        name: "Cafetería & Pastelería Aroma E.I.R.L.",
        slug: "cafeteria-pasteleria-aroma",
        ruc: "20556611223",
        taxId: "20556611223",
        email: "contacto@cafearoma.pe",
        phone: "012716493",
        address: "Av. Primavera 1240, Santiago de Surco",
        website: "https://cafearoma.pe",
        legalRepresentative: "Andrés Cisneros Rey",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Andrés Cisneros Rey",
        email: "andres.cisneros@cafearoma.pe",
        phone: "971144225"
      }
    },
    {
      company: {
        name: "Librería y Útiles Escolares Minerva",
        slug: "libreria-utiles-minerva",
        ruc: "20104477889",
        taxId: "20104477889",
        email: "ventas@libreriaminerva.com.pe",
        phone: "014275030",
        address: "Av. Grau 415, Barranco",
        website: "https://libreriaminerva.com.pe",
        legalRepresentative: "Sonia Miranda Vaca",
        subscriptionTier: "BASIC"
      },
      admin: {
        name: "Sonia Miranda Vaca",
        email: "sonia.miranda@libreriaminerva.com.pe",
        phone: "963388114"
      }
    },
    {
      company: {
        name: "Tecnología y Redes del Norte SAC",
        slug: "tecnologia-redes-norte",
        ruc: "20485599110",
        taxId: "20485599110",
        email: "soporte@redesnorte.pe",
        phone: "044293847",
        address: "Av. Larco 820, Trujillo",
        website: "https://redesnorte.pe",
        legalRepresentative: "Manuel Solano Paz",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Manuel Solano Paz",
        email: "manuel.solano@redesnorte.pe",
        phone: "951166334"
      }
    },
    {
      company: {
        name: "Zapatería Real Calzado SAC",
        slug: "zapateria-real-calzado",
        ruc: "20601177665",
        taxId: "20601177665",
        email: "gerencia@realcalzado.com",
        phone: "013829104",
        address: "Av. Gran Chimú 412, Zárate",
        website: "https://realcalzado.com",
        legalRepresentative: "Héctor Vidal Bruno",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Héctor Vidal Bruno",
        email: "hector.vidal@realcalzado.com",
        phone: "940022115"
      }
    },
    {
      company: {
        name: "Gimnasio & Fitness Iron Body",
        slug: "gimnasio-fitness-iron-body",
        ruc: "20554499113",
        taxId: "20554499113",
        email: "info@ironbody.pe",
        phone: "014802910",
        address: "Av. Brasil 2340, Jesús María",
        website: "https://ironbody.pe",
        legalRepresentative: "Roberto Cavani Flores",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Roberto Cavani Flores",
        email: "roberto.cavani@ironbody.pe",
        phone: "982277114"
      }
    },
    {
      company: {
        name: "Joyas y Accesorios Splendor SAC",
        slug: "joyas-accesorios-splendor",
        ruc: "20607733449",
        taxId: "20607733449",
        email: "ventas@joyassplendor.com",
        phone: "012224510",
        address: "Av. Conquistadores 730, San Isidro",
        website: "https://joyassplendor.com",
        legalRepresentative: "Diana de la Fuente Solis",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Diana de la Fuente Solis",
        email: "diana.delafuente@joyassplendor.com",
        phone: "965511992"
      }
    },
    {
      company: {
        name: "Bodega Logística del Norte E.I.R.L.",
        slug: "bodega-logistica-norte",
        ruc: "20401188334",
        taxId: "20401188334",
        email: "operaciones@logisticanorte.pe",
        phone: "074238591",
        address: "Av. Salaverry 450, Chiclayo",
        website: "https://logisticanorte.pe",
        legalRepresentative: "Federico Urbina Prada",
        subscriptionTier: "PREMIUM"
      },
      admin: {
        name: "Federico Urbina Prada",
        email: "federico.urbina@logisticanorte.pe",
        phone: "931144882"
      }
    },
    {
      company: {
        name: "Licorería & Minimarket El Brindis SAC",
        slug: "licoreria-minimarket-el-brindis",
        ruc: "20619933552",
        taxId: "20619933552",
        email: "hola@elbrindis.pe",
        phone: "014510293",
        address: "Av. La Marina 3200, San Miguel",
        website: "https://elbrindis.pe",
        legalRepresentative: "Claudio Rossi Benítez",
        subscriptionTier: "BASIC"
      },
      admin: {
        name: "Claudio Rossi Benítez",
        email: "claudio.rossi@elbrindis.pe",
        phone: "920044881"
      }
    }
  ];

  for (const item of companiesToSeed) {
    console.log(`\n🏢 Creando ecosistema autónomo para: ${item.company.name}...`);

    // 1. Crear Empresa
    const company = await prisma.company.create({
      data: item.company
    });

    // 2. Crear Suscripción Mensual Activa
    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    await prisma.subscription.create({
      data: {
        companyId: company.id,
        status: "ACTIVE",
        startDate: now,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        stripeSubscriptionId: `sub_mock_${company.slug}_001`,
        stripePriceId: `price_${company.subscriptionTier.toLowerCase()}_mensual`
      }
    });

    // 3. Crear Historial de Facturación (2 Recibos por empresa)
    const lastMonth = new Date(now);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Corregido: Asignación dinámica de montos realista por plan
    const amount = company.subscriptionTier === "PREMIUM" ? 99.90 : 49.90;

    await prisma.billingHistory.createMany({
      data: [
        {
          companyId: company.id,
          amount: amount,
          currency: "PEN",
          status: "COMPLETED",
          receiptUrl: `https://dashboard.stripe.com/receipts/mock-${company.id}-1`,
          stripeInvoiceId: `in_mock_${company.slug}_001`,
          createdAt: lastMonth
        },
        {
          companyId: company.id,
          amount: amount,
          currency: "PEN",
          status: "COMPLETED",
          receiptUrl: `https://dashboard.stripe.com/receipts/mock-${company.id}-2`,
          stripeInvoiceId: `in_mock_${company.slug}_002`,
          createdAt: now
        }
      ]
    });

    // 4. Crear Configuración base
    await prisma.configuration.create({
      data: {
        companyId: company.id
      }
    });

    // 5. Crear Sucursal Principal (Necesaria en un objeto para mapear al Admin de abajo)
    const branch = await prisma.branch.create({
      data: {
        name: "Sucursal Principal",
        code: "PRINCIPAL",
        address: company.address,
        city: "Lima",
        state: "Lima",
        country: "Perú",
        phone: company.phone,
        email: company.email,
        companyId: company.id
      }
    });

    // 5b. NUEVO: Inyección masiva de Sucursales Regionales por Empresa
    // =================================================================
    // 5b. GENERADOR DINÁMICO DE SUCURSALES REGIONALES (Genera ~50 en total)
    // =================================================================

    // Pool de ciudades peruanas con datos geográficos reales para el mapeo
    const regionesPeru = [
      { city: "Trujillo", state: "La Libertad", code: "TRU", address: "Av. Larco 789, Urb. San Andrés" },
      { city: "Arequipa", state: "Arequipa", code: "AQP", address: "Calle Mercaderes 402, Cercado" },
      { city: "Huancayo", state: "Junín", code: "HYO", address: "Av. Real 1045, El Tambo" },
      { city: "Piura", state: "Piura", code: "PIU", address: "Av. Grau 1420, Urb. Santa Isabel" },
      { city: "Chiclayo", state: "Lambayeque", code: "CIX", address: "Av. Balta 345, Cercado" },
      { city: "Cusco", state: "Cusco", code: "CUZ", address: "Av. El Sol 612" },
      { city: "Iquitos", state: "Loreto", code: "IQT", address: "Jr. Próspero 564" },
      { city: "Tacna", state: "Tacna", code: "TAC", address: "Av. Bolognesi 830" },
      { city: "Chimbote", state: "Áncash", code: "CHM", address: "Av. José Pardo 415" },
      { city: "Pucallpa", state: "Ucayali", code: "PCL", address: "Jr. Tarapacá 710" }
    ];

    // Asignamos de forma determinista 2 o 3 ciudades del pool basadas en el índice o ID de la empresa
    // Esto asegura que cada empresa tenga sucursales distintas y en total sumen ~50 sucursales.
    const numSucursalesAdicionales = (company.id % 2 === 0) ? 3 : 2;
    const sucursalesData = [];

    for (let i = 0; i < numSucursalesAdicionales; i++) {
      // Tomamos una región del pool rotando dinámicamente usando aritmética modular
      const regionIndex = (company.id + i) % regionesPeru.length;
      const region = regionesPeru[regionIndex];

      sucursalesData.push({
        name: `Sucursal ${region.city}`,
        // El código incluye el slug de la empresa para garantizar la restricción UNIQUE en la DB
        code: `${company.slug.substring(0, 5).toUpperCase()}-${region.code}-${i + 1}`,
        address: region.address,
        city: region.city,
        state: region.state,
        country: "Perú",
        phone: company.phone,
        email: `${region.city.toLowerCase()}.${company.slug}@empresa.com`,
        companyId: company.id
      });
    }

    // Insertamos el bloque de sucursales en lote único por empresa
    await prisma.branch.createMany({
      data: sucursalesData,
      skipDuplicates: true // Evita colisiones si ejecutas el seed repetidas veces
    });

    // 6. Crear ÚNICO Usuario Administrador enlazado a la sucursal principal y la empresa
    const admin = await prisma.user.create({
      data: {
        name: item.admin.name,
        email: item.admin.email,
        password,
        role: "ADMIN",
        phone: item.admin.phone,
        companyId: company.id,
        branchId: branch.id
      }
    });

    console.log(`✅ Registro exitoso para ${company.name} (+3 sucursales regionales)`);
    console.log(`   🔑 ADMIN: ${admin.email}`);
  }

  console.log("\n====================================");
  console.log("⭐ PROCESO COMPLETADO: 20 EMPRESAS E INVITADOS INSERTADOS");
  console.log("🔑 PASSWORD COMÚN DE ACCESO:", process.env.SEED_PASSWORD || "admin123");
  console.log("====================================\n");
}

module.exports = {
  adminSeed
};