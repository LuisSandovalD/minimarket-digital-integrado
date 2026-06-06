import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import Modal from "./Modal";

export default function AlertModal({
  open,
  onClose,
  type = "info",
  title,
  message,
}) {
  const styles = {
    info: {
      icon: Info,
      color: "text-blue-600",
    },
    success: {
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-amber-600",
    },
    error: {
      icon: AlertCircle,
      color: "text-rose-600",
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="p-6 flex gap-3 items-start">
        <Icon className={style.color} size={22} />

        <div className="flex-1">
          {title && <h3 className="font-semibold text-lg">{title}</h3>}
          {message && <p className="text-sm text-gray-500 mt-1">{message}</p>}
        </div>

        <button onClick={onClose} className="opacity-60 hover:opacity-100">
          <X size={18} />
        </button>
      </div>
    </Modal>
  );
}
