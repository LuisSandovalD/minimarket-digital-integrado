// ========================================
// components/feedback/AlertModal.jsx
// ========================================

import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import Modal from "./Modal";

export default function AlertModal({
  open,
  onClose,
  type = "info",
  title,
  message,
  children, // <--- 1. Clave para recibir a HeaderModal y los botones
}) {
  const styles = {
    info: { icon: Info, color: "text-blue-600 dark:text-blue-400" },
    success: {
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
    },
    error: { icon: AlertCircle, color: "text-rose-600 dark:text-rose-400" },
  };

  const style = styles[type] || styles.info;
  const Icon = style.icon;

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="p-6 relative">
        <div className="flex gap-3.5 items-start">
          {/* Icono de estado */}
          <div className="mt-0.5 shrink-0">
            <Icon className={style.color} size={22} />
          </div>

          {/* Contenido dinámico */}
          <div className="flex-1 space-y-3">
            {/* 2. Renderizado clásico por Props (por si se usa de la forma antigua) */}
            {(title || message) && (
              <div>
                {title && (
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                    {title}
                  </h3>
                )}
                {message && (
                  <p className="text-sm text-slate-500 mt-1">{message}</p>
                )}
              </div>
            )}

            {/* 3. Renderizado por Composición (Aquí cae <HeaderModal /> y los botones) */}
            {children && <div className="w-full">{children}</div>}
          </div>
        </div>
      </div>
    </Modal>
  );
}
