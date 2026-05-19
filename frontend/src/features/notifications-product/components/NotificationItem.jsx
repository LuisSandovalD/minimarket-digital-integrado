// ========================================
// features/notifications/components/NotificationItem.jsx
// ========================================

import {
  AlertTriangle,
  Package,
  TrendingDown,
  Clock,
  Check,
  X,
} from "lucide-react";

export default function NotificationItem({
  notification,
  onToggleRead,
  onRemove,
}) {
  // ========================================
  // ICON AND COLOR MAPPING
  // ========================================

  const iconMap = {
    expired: AlertTriangle,
    expiring: Clock,
    out_stock: TrendingDown,
    outOfStock: TrendingDown,
    low_stock: AlertTriangle,
    lowStock: AlertTriangle,
  };

  const colorMap = {
    expired: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      icon: "text-red-500",
      dot: "bg-red-500",
    },
    expiring: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      icon: "text-orange-500",
      dot: "bg-orange-500",
    },
    out_stock: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: "text-amber-500",
      dot: "bg-amber-500",
    },
    outOfStock: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: "text-amber-500",
      dot: "bg-amber-500",
    },
    low_stock: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      icon: "text-yellow-500",
      dot: "bg-yellow-500",
    },
    lowStock: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      icon: "text-yellow-500",
      dot: "bg-yellow-500",
    },
  };

  const Icon =
    iconMap[notification.type] || Package;
  const colors =
    colorMap[notification.type] ||
    colorMap.low_stock;

  // ========================================
  // TYPE LABELS
  // ========================================

  const typeLabels = {
    expired: "Vencido",
    expiring: "Por vencer",
    out_stock: "Sin stock",
    outOfStock: "Sin stock",
    low_stock: "Stock bajo",
    lowStock: "Stock bajo",
  };

  // ========================================
  // FORMAT TIMESTAMP
  // ========================================

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    return new Date(timestamp).toLocaleDateString(
      "es-ES",
      {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div
      className={`
        flex
        items-start
        gap-3

        border-b
        border-white/5

        px-5
        py-4

        transition-all
        duration-200

        group

      `}
    >
      {/* UNREAD INDICATOR */}
      {!notification.read && (
        <div
          className={`
            mt-1

            h-2
            w-2

            rounded-full

            shrink-0

            ${colors.dot}
          `}
        />
      )}

      {/* ICON */}
      <div
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-lg

          shrink-0

          border

          ${colors.bg}
          ${colors.border}

          ${colors.icon}
        `}
      >
        <Icon size={16} />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p
              className="
                text-sm
                font-medium

                text-white
              "
            >
              {notification.title}
            </p>

            <p
              className="
                mt-1

                text-xs

                text-slate-400

                line-clamp-2
              "
            >
              {notification.message}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span
                className={`
                  inline-block

                  px-2
                  py-0.5

                  rounded-md

                  text-[10px]
                  font-medium
                  uppercase
                  tracking-wider

                  ${colors.bg}
                  ${colors.border}
                  border

                  ${colors.icon}
                `}
              >
                {typeLabels[notification.type]}
              </span>

              {notification.timestamp && (
                <span
                  className="
                    text-[10px]

                    text-slate-500
                  "
                >
                  {formatTime(
                    notification.timestamp
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}