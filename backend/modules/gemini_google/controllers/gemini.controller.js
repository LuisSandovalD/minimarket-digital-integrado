// ========================================
// modules/gemini_google/controllers/gemini.controller.js
// ========================================

const geminiService = require('../services/gemini.service.js');
const { adminSystemInstruction } = require('../prompts/admin.prompts.js');
const { migrationSystemInstruction } = require('../prompts/migration.prompts.js');

const { serializePrismaData, limitContextPayload } = require('../utils/tokenLimiter.js');
const prisma = require('../../../prisma/client');

const handleAdminChat = async (req, res, next) => {
    try {
        const { companyId, name: userName } = req.user;
        const { chatHistory, currentMessage } = req.body;

        // 🧹 LIMPIEZA DE HISTORIAL PREVIO (Previene la acumulación de Tokens y el Error 429)
        // Si un mensaje del historial contiene un snapshot anterior "[SNAPSHOT...]", lo limpiamos
        // dejando solo la pregunta real para no multiplicar exponencialmente el consumo de tokens.
        const formattedHistory = (chatHistory || []).map(msg => {
            let textoProcesado = msg.text || "";
            if (textoProcesado.includes("PREGUNTA DEL ADMINISTRADOR:")) {
                const matchPregunta = textoProcesado.match(/PREGUNTA DEL ADMINISTRADOR:\s*"([\s\S]*?)"/);
                if (matchPregunta) {
                    textoProcesado = matchPregunta[1];
                }
            }
            return {
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: textoProcesado }]
            };
        });

        const textoLimpio = (currentMessage || "").toLowerCase();

        // 🎯 DETECTOR DE INTENCIONES AUTOMÁTICO
        const esPrimerMensaje = formattedHistory.length === 0;
        const pideMétricasFinancieras = /venda|compra|año|mes|dia|fecha|lote|vence|caduca|inventario|caja|gasto|financiero|balance|reporte|ganancia|alto|maximo|record/i.test(textoLimpio);

        if (esPrimerMensaje || pideMétricasFinancieras) {

            // 📅 MOTOR DE DETECCIÓN CRONOLÓGICA DINÁMICA
            const fechaActual = new Date();
            let targetYear = fechaActual.getFullYear();
            let targetMonth = null; // null significa todo el año
            let targetDay = null;   // null significa todo el mes

            // 1. Extraer Año (cualquier número de 4 dígitos que empiece con 20)
            const matchAnio = textoLimpio.match(/\b(20\d{2})\b/);
            if (matchAnio) {
                targetYear = parseInt(matchAnio[1], 10);
            }

            // 2. Extraer Mes (mapeo de lenguaje natural)
            const mesesDiccionario = {
                'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
                'julio': 6, 'agosto': 7, 'septiembre': 8, 'setiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
            };

            for (const [mesNombre, mesIndex] of Object.entries(mesesDiccionario)) {
                if (textoLimpio.includes(mesNombre)) {
                    targetMonth = mesIndex;
                    break;
                }
            }

            // 3. Extraer Día específico (ej: "el 15 de", "dia 3", "24 de mayo")
            const matchDia = textoLimpio.match(/(?:el\s+dia\s+|el\s+|del\s+|^)\b([1-9]|[12]\d|3[01])\b(?!\d{2})/);
            if (matchDia && (targetMonth !== null || matchAnio)) {
                targetDay = parseInt(matchDia[1], 10);
            }

            // 🛠️ CONSTRUCCIÓN POLIMÓRFICA DEL RANGO DE FECHAS (Prisma boundary)
            let gteDate, lteDate;

            if (targetYear && targetMonth !== null && targetDay !== null) {
                // Día en específico
                gteDate = new Date(Date.UTC(targetYear, targetMonth, targetDay, 0, 0, 0, 0));
                lteDate = new Date(Date.UTC(targetYear, targetMonth, targetDay, 23, 59, 59, 999));
            } else if (targetYear && targetMonth !== null) {
                // Mes completo
                gteDate = new Date(Date.UTC(targetYear, targetMonth, 1, 0, 0, 0, 0));
                lteDate = new Date(Date.UTC(targetYear, targetMonth + 1, 0, 23, 59, 59, 999));
            } else {
                // Año completo
                gteDate = new Date(Date.UTC(targetYear, 0, 1, 0, 0, 0, 0));
                lteDate = new Date(Date.UTC(targetYear, 12, 0, 23, 59, 59, 999));
            }

            // 📊 CONSULTAS PARALELAS OPTIMIZADAS CON TOP DE LÍMITES BAJOS (Protección de cuota gratis)
            const [
                ventasPeriodo,
                comprasPeriodo,
                ventaMasAlta,
                compraMasAlta,
                inventarioConLotes,
                ultimosPagosCaja,
                clientesDeudores,
                configEmpresa
            ] = await Promise.all([
                // Ventas del período solicitado
                prisma.sale.findMany({
                    where: { companyId, createdAt: { gte: gteDate, lte: lteDate }, NOT: { status: 'CANCELLED' } },
                    orderBy: { createdAt: 'desc' },
                    take: 15, // Paginado estratégico para desarrollo
                    select: { id: true, total: true, status: true, createdAt: true }
                }),
                // Compras del período solicitado
                prisma.purchase.findMany({
                    where: { companyId, createdAt: { gte: gteDate, lte: lteDate } },
                    orderBy: { createdAt: 'desc' },
                    take: 15,
                    select: { id: true, total: true, status: true, createdAt: true }
                }),
                // Record del periodo: Venta más alta
                prisma.sale.findFirst({
                    where: { companyId, createdAt: { gte: gteDate, lte: lteDate }, NOT: { status: 'CANCELLED' } },
                    orderBy: { total: 'desc' },
                    select: { id: true, total: true, createdAt: true }
                }),
                // Record del periodo: Compra más alta
                prisma.purchase.findFirst({
                    where: { companyId, createdAt: { gte: gteDate, lte: lteDate } },
                    orderBy: { total: 'desc' },
                    select: { id: true, total: true, createdAt: true }
                }),
                // Inventario básico crítico
                prisma.product.findMany({
                    where: { companyId, isDeleted: false },
                    orderBy: { minStock: 'desc' },
                    take: 10, // Optimizado de 20 a 10 para salvar tokens
                    select: {
                        name: true,
                        minStock: true,
                        salePrice: true,
                        purchasePrice: true,
                        ...(prisma.batch ? { batches: { where: { stock: { gt: 0 } }, select: { batchNumber: true, stock: true, expirationDate: true } } } : {})
                    }
                }),
                // Flujo de caja general reciente
                prisma.payment.findMany({
                    where: { OR: [{ sale: { companyId } }, { purchase: { companyId } }] },
                    orderBy: { createdAt: 'desc' },
                    take: 5, // Reducido para agilizar la transmisión
                    select: { amount: true, status: true, paymentMethod: true, createdAt: true }
                }),
                // Cartera pesada de clientes
                prisma.customer.findMany({
                    where: { companyId, currentDebt: { gt: 0 } },
                    orderBy: { currentDebt: 'desc' },
                    take: 3,
                    select: { name: true, currentDebt: true }
                }),
                // Configuración de monedas
                prisma.configuration.findUnique({
                    where: { companyId }
                })
            ]);

            // Consolidamos la estructura compacta adaptada al motor de Mateo
            const erpSnapshot = {
                administradorNombre: userName || "Administrador",
                monedaGlobal: configEmpresa?.currency || "PEN",
                filtroTemporalAplicado: {
                    anio: targetYear,
                    mes: targetMonth !== null ? targetMonth + 1 : "Todos",
                    dia: targetDay || "Todos"
                },
                metricasPeriodo: {
                    totalVentasContadas: ventasPeriodo.length,
                    totalComprasContadas: comprasPeriodo.length,
                    recordVentaMasAlta: ventaMasAlta || null,
                    recordCompraMasAlta: compraMasAlta || null,
                },
                moduloVentasPeriodo: ventasPeriodo,
                moduloComprasPeriodo: comprasPeriodo,
                moduloInventario: inventarioConLotes,
                flujoCajaReciente: ultimosPagosCaja,
                carteraMorosa: clientesDeudores
            };

            // Bajamos drásticamente el límite a 20 para evitar saturar el TPM (Tokens Por Minuto) de la API Free
            const safeSnapshot = limitContextPayload(serializePrismaData(erpSnapshot), 20);

            formattedHistory.push({
                role: 'user',
                parts: [{
                    text: `[SNAPSHOT CRONOLÓGICO DEL ERP - AUDITORÍA EN TIEMPO REAL]\n${JSON.stringify(safeSnapshot)}\n\nPREGUNTA DEL ADMINISTRADOR: "${currentMessage}"`
                }]
            });
        } else {
            formattedHistory.push({
                role: 'user',
                parts: [{ text: currentMessage }]
            });
        }

        const replyText = await geminiService.callGeminiChat(adminSystemInstruction, formattedHistory);

        return res.status(200).json({
            success: true,
            reply: replyText
        });

    } catch (error) {
        next(error);
    }
};

const handleExcelMigrationAnalysis = async (req, res, next) => {
    try {
        const { excelData, userPrompt } = req.body;
        const sampleRows = Array.isArray(excelData) ? excelData.slice(0, 100) : excelData;

        const migrationBlueprint = await geminiService.callGeminiJson(
            migrationSystemInstruction,
            sampleRows,
            userPrompt || 'Convierte y limpia este archivo plano al formato estructurado del sistema.'
        );

        return res.status(200).json({
            success: true,
            migrationBlueprint
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleAdminChat,
    handleExcelMigrationAnalysis
};