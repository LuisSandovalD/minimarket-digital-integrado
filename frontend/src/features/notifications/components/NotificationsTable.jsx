// ========================================
// features/notifications/components/NotificationsTable.jsx
// ========================================

import {
  AlertCircle,
  AlertTriangle,
  Building2,
  CalendarDays,
  Clock,
  Eye,
  FileSpreadsheet,
  Server,
  ShoppingCart,
  User,
} from "lucide-react";

import ModernButton from "@/components/buttons/ModernButton";
import { Table, TFooter, THead } from "@/components/data-display/";

// ========================================
// CONFIGURACIÓN DINÁMICA POR TIPO DE ENUM
// ========================================
const TYPE_CONFIG = {
  EXPIRING_PRODUCT: {
    label: "Por Vencer",
    icon: Clock,
    styles:
      "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/30 dark:border-orange-900 dark:text-orange-400",
    iconColor: "text-orange-500",
    isCriticalStock: false,
  },
  LOW_STOCK: {
    label: "Stock Bajo",
    icon: AlertTriangle,
    styles:
      "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-400",
    iconColor: "text-amber-500",
    isCriticalStock: true,
  },
  SYSTEM_ALERT: {
    label: "Sistema",
    icon: Server,
    styles:
      "bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-950/30 dark:border-slate-900 dark:text-slate-400",
    iconColor: "text-slate-500",
    isCriticalStock: false,
  },
  PURCHASE_READY: {
    label: "Listo p/ Compra",
    icon: ShoppingCart,
    styles:
      "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-400",
    iconColor: "text-blue-500",
    isCriticalStock: false,
  },
  USER_ALERT: {
    label: "Usuario",
    icon: User,
    styles:
      "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/30 dark:border-purple-900 dark:text-purple-400",
    iconColor: "text-purple-500",
    isCriticalStock: false,
  },
  INVENTORY_MISMATCH: {
    label: "Descuadre",
    icon: FileSpreadsheet,
    styles:
      "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-400",
    iconColor: "text-rose-500",
    isCriticalStock: true, // Lo tratamos como crítico porque falta mercadería física
  },
  PAYMENT_OVERDUE: {
    label: "Pago Vencido",
    icon: AlertCircle,
    styles:
      "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900 dark:text-red-400",
    iconColor: "text-red-500",
    isCriticalStock: false,
  },
};

export default function NotificationsTable({
  notifications = [],
  page = 1,
  totalPages = 1,
  onPrev,
  onNext,
  onOcultar,
}) {
  const columns = [
    { key: "type", label: "Tipo Alerta" },
    { key: "product", label: "Producto / SKU" },
    { key: "message", label: "Detalle de Alerta" },
    { key: "branch", label: "Almacén" },
    { key: "stock", label: "Inventario" },
    { key: "createdAt", label: "Detectado" },
    { key: "actions", label: "Acciones" },
  ];

  return (
    <div className="space-y-4">
      <Table>
        <THead columns={columns} />
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notif) => {
              // Si viene un tipo desconocido, usamos 'SYSTEM_ALERT' por defecto
              const config =
                TYPE_CONFIG[notif.type] || TYPE_CONFIG.SYSTEM_ALERT;
              const IconComponent = config.icon;

              return (
                <tr
                  key={notif.id}
                  className="
                    border-b
                    border-slate-200/60
                    transition-all
                    duration-200
                    hover:bg-slate-50/70
                    dark:border-slate-800
                    dark:hover:bg-slate-900/40
                  "
                >
                  {/* COLUMNA 1: BADGE DINÁMICO SEGÚN NOTIFICATION_TYPE */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${config.styles}`}
                    >
                      <IconComponent size={14} className={config.iconColor} />
                      {config.label}
                    </span>
                  </td>

                  {/* COLUMNA 2: PRODUCTO Y SKU */}
                  <td className="px-6 py-5">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
                        {notif.title}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                        {notif.product?.sku
                          ? `SKU: ${notif.product.sku}`
                          : "N/A"}
                      </p>
                    </div>
                  </td>

                  {/* COLUMNA 3: DETALLE DE ALERTA */}
                  <td className="px-6 py-5">
                    <p className="max-w-[320px] text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                      {notif.message || notif.description}
                    </p>
                  </td>

                  {/* COLUMNA 4: ALMACÉN / SUCURSAL */}
                  <td className="px-6 py-5">
                    {notif.branch?.name ? (
                      <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900">
                        <Building2 size={14} className="text-slate-500" />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {notif.branch.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">-</span>
                    )}
                  </td>

                  {/* COLUMNA 5: INVENTARIO REAL VS MÍNIMO */}
                  <td className="px-6 py-5">
                    {notif.product ? (
                      <div className="flex flex-col">
                        <span
                          className={`text-base font-mono font-black ${
                            config.isCriticalStock
                              ? "text-red-600"
                              : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {notif.product.stock} u.
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Mínimo: {notif.product.minStock} u.
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">No aplica</span>
                    )}
                  </td>

                  {/* COLUMNA 6: FECHA DE DETECCIÓN */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <CalendarDays size={14} className="text-slate-400" />
                      <span className="text-sm">
                        {notif.createdAt
                          ? new Date(notif.createdAt).toLocaleDateString()
                          : "En vivo"}
                      </span>
                    </div>
                  </td>

                  {/* COLUMNA 7: ACCIONES DISPONIBLES */}
                  <td className="px-6 py-5">
                    <ModernButton
                      text="Ocultar"
                      size="sm"
                      variant="secondary"
                      icon={Eye}
                      onClick={() => onOcultar?.(notif.id)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-16 text-center text-sm text-slate-500"
              >
                No se encontraron alertas de inventario activas con los filtros
                aplicados.
              </td>
            </tr>
          )}
        </tbody>

        <TFooter
          page={page}
          totalPages={totalPages}
          onPrev={onPrev}
          onNext={onNext}
        />
      </Table>
    </div>
  );
}
