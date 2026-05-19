import { useState } from "react";
import { Trash2, AlertTriangle, Lock } from "lucide-react";
import { Modal, HeaderModal, FooterModal } from "@/components/modals";
import { ModernButton } from "@/components/buttons";
import Input from "@/components/inputs/Input";
import useDeleteAccount from "../hooks/useDeleteAccount";

export default function DeleteAccountModal({
  open,
  onClose,
}) {
  const { removeAccount, isLoading } = useDeleteAccount();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!password) {
      setError("Por favor ingresa tu contraseña");
      return;
    }

    try {
      setError("");
      await removeAccount({ password });
      setPassword("");
      onClose();
    } catch (err) {
      setError(err.message || "Error al eliminar la cuenta");
      console.error("DELETE ACCOUNT ERROR:", err);
    }
  }

  return (
    <Modal open={open} onClose={onClose} size="md">
      <HeaderModal
        title="Eliminar Cuenta"
        subtitle="Esta acción es irreversible y cerrará todas tus sesiones"
        onClose={onClose}
      />

      <div className="px-6 py-6 space-y-5">
        {/* Warning Alert */}
        <div className="flex gap-3 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/70 dark:bg-red-900/10 p-4">
          <AlertTriangle size={20} className="mt-0.5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Zona de riesgo
            </p>
            <p className="mt-1 text-xs text-red-600 dark:text-red-300">
              Tu cuenta será eliminada permanentemente. Se cerrarán todas las sesiones activas y perderás el acceso al sistema.
            </p>
          </div>
        </div>

        {/* Password Input */}
        <Input
          label="Confirmar Contraseña"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          icon={Lock}
          placeholder="Ingresa tu contraseña"
          required
        />

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/70 dark:bg-red-900/10">
            <p className="text-sm text-red-700 dark:text-red-400">
              {error}
            </p>
          </div>
        )}
      </div>

      <FooterModal>
        <div className="flex justify-end gap-3 w-full">
          <ModernButton
            text="Cancelar"
            variant="outline"
            onClick={() => {
              setPassword("");
              setError("");
              onClose();
            }}
            disabled={isLoading}
          />

          <ModernButton
            text={isLoading ? "Eliminando..." : "Eliminar Cuenta"}
            icon={Trash2}
            onClick={handleDelete}
            disabled={isLoading || !password}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}