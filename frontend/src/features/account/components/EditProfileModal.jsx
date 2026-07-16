import { ModernButton } from "@/components/buttons";
import { Input } from "@/components/forms/";
import { ModernImageUpload } from "@/components/media/";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";
import { AlertCircle, Briefcase, Building2, Calendar, Mail, Phone, Save, Shield, User, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ROLE_LABELS } from "../constants/account.constants";
import useAccountProfile from "../hooks/useAccountProfile";

export default function EditProfileModal({ open, onClose }) {
  const { user, saving, serverError, validationErrors, handleUpdateProfile } = useAccountProfile();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
    });
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit() {
    const success = await handleUpdateProfile(form);
    if (success) onClose();
  }

  // Extracción segura para evitar que objetos rompan el renderizado del Input
  const companyName = typeof user?.company === "object" ? user?.company?.name : user?.company;
  const branchName = typeof user?.branch === "object" ? user?.branch?.name : user?.branch;

  return (
    <Modal open={open} onClose={onClose} size="full">
      <HeaderModal
        icon={User}
        title="Editar Perfil"
        subtitle="Actualiza tu información de contacto y revisa tus credenciales de acceso"
        onClose={onClose}
      />

      <div className="max-h-[75vh] overflow-y-auto px-6 py-6 space-y-6">
        {(serverError || Object.keys(validationErrors).length > 0) && (
          <div className="p-4 text-xs font-semibold rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-950/30 flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div className="space-y-1">
              {serverError && <p>{serverError}</p>}
              {Object.values(validationErrors).map((err, idx) => (
                <p key={idx}>• {err}</p>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
          <div className="flex flex-col gap-3">
            <ModernImageUpload
              value={form.avatar}
              onChange={(value) => setForm((prev) => ({ ...prev, avatar: value }))}
              label="Foto de Perfil"
              description="Soporta PNG, JPG o WEBP"
            />
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800/60 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Información del Usuario</h3>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                El correo electrónico y la contraseña son credenciales de acceso administradas por el sistema y no
                pueden modificarse desde este perfil.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Nombre Completo"
                name="name"
                value={form.name}
                onChange={handleChange}
                icon={User2}
                placeholder="Tu nombre completo"
                error={validationErrors.name}
                required
              />

              <Input label="Correo Electrónico" name="email" value={form.email} icon={Mail} disabled />

              <Input
                label="Teléfono / Celular"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                icon={Phone}
                placeholder="+51 999 999 999"
              />

              <Input
                label="Rol de Acceso"
                value={ROLE_LABELS[user?.role] || user?.role || "Personal"}
                icon={Shield}
                disabled
              />

              <Input label="Empresa Asignada" value={companyName || "—"} icon={Building2} disabled />

              <Input label="Sucursal Local" value={branchName || "—"} icon={Briefcase} disabled />

              <Input
                label="Fecha de Registro"
                value={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("es-PE", {
                        dateStyle: "long",
                      })
                    : "—"
                }
                icon={Calendar}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <FooterModal>
        <div className="flex gap-3 justify-end w-full">
          <ModernButton text="Cancelar" variant="outline" onClick={onClose} disabled={saving} />
          <ModernButton
            text={saving ? "Guardando..." : "Guardar Cambios"}
            icon={Save}
            onClick={handleSubmit}
            disabled={saving}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
