// ========================================
// features/account/components/EditProfileModal.jsx
// ========================================
import {
  AlertCircle,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  Mail,
  Phone,
  Save,
  Shield,
  User2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { Input } from "@/components/forms/";
import { ModernImageUpload } from "@/components/media/";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";
import { ROLE_LABELS } from "../constants/account.constants";
import useAccountProfile from "../hooks/useAccountProfile"; // Enlace al hook del ecosistema

export default function EditProfileModal({ open, onClose }) {
  // 1. Consumimos el estado reactivo, flags globales de carga y errores del Store central
  const { user, saving, serverError, validationErrors, handleUpdateProfile } =
    useAccountProfile();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  // Sincronizar el estado local únicamente con las propiedades editables por el perfil
  useEffect(() => {
    if (!user) return;
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
    });
  }, [user, open]); // Añadido open para re-sincronizar si hubo cambios externos al reabrir

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /* ======================================
   * PROCESADOR DE PERSISTENCIA SEGURO
   * ==================================== */
  async function handleSubmit() {
    // handleUpdateProfile ejecuta internamente la validación corporativa
    const success = await handleUpdateProfile(form);

    // Solo cerramos el modal si el backend y las validaciones confirman la transacción
    if (success) {
      onClose();
    }
  }

  return (
    <Modal open={open} onClose={onClose} size="lg">
      {" "}
      {/* Optimizado de 'full' a 'lg' para mejor ergonomía de lectura */}
      <HeaderModal
        title="Editar Perfil"
        subtitle="Actualiza tu información de contacto y revisa tus credenciales de acceso"
        onClose={onClose}
      />
      <div className="max-h-[65vh] overflow-y-auto px-6 py-6 space-y-4">
        {/* PANEL DE ERRORES DEL SERVIDOR O CLIENTE */}
        {(serverError || Object.keys(validationErrors).length > 0) && (
          <div className="p-3.5 text-xs font-semibold rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-950/30 flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div className="space-y-1">
              {serverError && <p>{serverError}</p>}
              {Object.values(validationErrors).map((err, idx) => (
                <p key={idx} className="font-medium">
                  • {err}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* COLUMNA IZQUIERDA: Avatar corporativo */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera
                size={16}
                className="text-slate-500 dark:text-slate-400"
              />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Foto de Perfil
              </h3>
            </div>
            <ModernImageUpload
              value={form.avatar}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, avatar: value }))
              }
              label="Foto de Perfil"
              description="Soporta PNG, JPG o WEBP"
              height="h-64"
            />
          </div>

          {/* COLUMNA DERECHA: Campos de Datos */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                Información del Usuario
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Campos Editables con inyección de errores locales */}
                <Input
                  label="Nombre Completo"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  icon={User2}
                  placeholder="Tu nombre completo"
                  error={validationErrors.name} // Manejo reactivo de error visual
                  required
                />

                <Input
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  icon={Mail}
                  placeholder="correo@empresa.com"
                  error={validationErrors.email} // Manejo reactivo de error visual
                  required
                />

                <Input
                  label="Teléfono / Celular"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  icon={Phone}
                  placeholder="+51 999 999 999"
                />

                {/* Campos de Auditoría del Sistema (Deshabilitados estables) */}
                <Input
                  label="Rol de Acceso"
                  value={ROLE_LABELS[user?.role] || user?.role || "Personal"}
                  icon={Shield}
                  disabled
                />

                <Input
                  label="Empresa Asignada"
                  value={user?.company || "-"}
                  icon={Building2}
                  disabled
                />

                <Input
                  label="Sucursal Local"
                  value={user?.branch || "-"}
                  icon={Briefcase}
                  disabled
                />

                <Input
                  label="Fecha de Registro"
                  value={
                    user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("es-PE", {
                          dateStyle: "long",
                        })
                      : "-"
                  }
                  icon={Calendar}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterModal>
        <div className="flex gap-3 justify-end w-full">
          <ModernButton
            text="Cancelar"
            variant="outline"
            onClick={onClose}
            disabled={saving}
          />
          <ModernButton
            text={saving ? "Guardando..." : "Guardar Cambios"}
            icon={Save}
            onClick={handleSubmit}
            disabled={saving} // Acoplado al estado asíncrono global
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
