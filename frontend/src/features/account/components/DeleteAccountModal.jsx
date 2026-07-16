// ========================================
// features/account/components/DeleteAccountModal.jsx
// ========================================
import { AlertCircle, AlertTriangle, Lock, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { Input } from "@/components/forms";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";
// CONECTADO: Usamos el hook real de tu arquitectura unificada
import useAccountProfile from "../hooks/useAccountProfile";

export default function DeleteAccountModal({ open, onClose }) {
  // Sincronizamos con los estados de carga, errores y acciones de tu Zustand Store
  const { handleDeleteAccount, deleteLoading, serverError, validationErrors } = useAccountProfile();

  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  // Limpiar el formulario y errores locales de manera proactiva al abrir/cerrar el modal
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPassword("");
      setLocalError("");
    }
  }, [open]);

  /* ======================================
   * PROCESADOR DE ELIMINACIÓN DE CUENTA
   * ==================================== */
  async function handleDelete() {
    if (!password) {
      setLocalError("Por favor ingresa tu contraseña para confirmar");
      return;
    }

    setLocalError("");

    // Tu hook real recibe el string 'password' directamente, ejecuta validaciones
    // y retorna un booleano determinista tras chocar con la API.
    const success = await handleDeleteAccount(password);

    if (success) {
      onClose();
      // Opcional: Aquí podrías forzar un window.location.href = '/login' si tu router no es reactivo al user: null
    }
  }

  return (
    <Modal open={open} onClose={onClose} size="md">
      <HeaderModal
        title="Eliminar Cuenta"
        subtitle="Esta acción borrará de forma irreversible todos tus registros comerciales"
        onClose={onClose}
      />

      <div className="px-6 py-6 space-y-5">
        {/* Warning Alert - Diseño de Zona de Riesgo */}
        <div className="flex gap-3 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/70 dark:bg-red-900/10 p-4">
          <AlertTriangle size={20} className="mt-0.5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">Acción Altamente Crítica</p>
            <p className="mt-1 text-xs leading-relaxed text-red-600/90 dark:text-red-300">
              Tu cuenta será eliminada permanentemente de la base de datos del sistema. Se revocarán de inmediato todas
              las sesiones activas en otros dispositivos de forma irreversible.
            </p>
          </div>
        </div>

        {/* Input de confirmación con máscara de password */}
        <Input
          label="Ingresa tu Contraseña Actual"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (localError) setLocalError(""); // Limpieza en caliente
          }}
          icon={Lock}
          placeholder="••••••••••••"
          required
          disabled={deleteLoading}
          error={validationErrors?.deletePassword} // Inyección de error de UI del hook
        />

        {/* Banner dinámico de Errores (Servidor, UI del hook o error local) */}
        {(localError || serverError || validationErrors?.deletePassword) && (
          <div className="p-3.5 text-xs font-semibold rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-950/30 flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{localError || serverError || validationErrors?.deletePassword}</span>
          </div>
        )}
      </div>

      <FooterModal>
        <div className="flex justify-end gap-3 w-full">
          <ModernButton text="Cancelar" variant="outline" onClick={onClose} disabled={deleteLoading} />

          <ModernButton
            text={deleteLoading ? "Borrando Cuenta..." : "Eliminar Definitivamente"}
            icon={Trash2}
            onClick={handleDelete}
            disabled={deleteLoading || !password}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white border-none"
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
