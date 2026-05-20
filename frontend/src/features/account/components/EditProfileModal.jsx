import { useEffect, useState } from "react";
import {
  User2,
  Mail,
  Phone,
  Building2,
  Save,
  Shield,
  Briefcase,
  Camera,
  Calendar,
  Lock,
} from "lucide-react";
import { Modal, HeaderModal, FooterModal } from "@/components/modals";
import { ModernButton } from "@/components/buttons";
import Input from "@/components/inputs/Input";
import ModernImageUpload from "@/components/ui/ModernImageUpload";

export default function EditProfileModal({
  open,
  onClose,
  user,
  company,
  branch,
  onSubmit,
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    twoFactorEnabled: false,
    isActive: true,
  });

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
      twoFactorEnabled: user?.twoFactorEnabled || false,
      isActive: user?.isActive ?? true,
    });
  }, [user]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      await onSubmit(form);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} size="full">
      <HeaderModal
        title="Editar Perfil"
        subtitle="Actualiza tu información personal y configuración de seguridad"
        onClose={onClose}
      />

      <div className="max-h-[78vh] overflow-y-auto px-6 py-6">
        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
          {/* LEFT: Avatar */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Camera
                size={16}
                className="text-slate-500 dark:text-slate-400"
              />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Foto
              </h3>
            </div>
            <ModernImageUpload
              value={form.avatar}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, avatar: value }))
              }
              label="Foto de Perfil"
              description="PNG, JPG o WEBP"
              height="h-75"
            />
          </div>

          {/* RIGHT: Form */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                Información Personal
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Nombre"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  icon={User2}
                  placeholder="Tu nombre"
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  icon={Mail}
                  placeholder="correo@email.com"
                  required
                />

                <Input
                  label="Teléfono"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  icon={Phone}
                  placeholder="+51 999 999 999"
                />

                <Input
                  label="Rol"
                  value={user?.role || "-"}
                  icon={Shield}
                  disabled
                />

                <Input
                  label="Empresa"
                  value={user?.company?.name || "-"}
                  icon={Building2}
                  disabled
                />

                <Input
                  label="Sucursal"
                  value={user?.branch?.name || "-"}
                  icon={Briefcase}
                  disabled
                />

                <Input
                  label="Registrado"
                  value={
                    user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("es-ES")
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
          <ModernButton text="Cancelar" variant="outline" onClick={onClose} />

          <ModernButton
            text={loading ? "Guardando..." : "Guardar"}
            icon={Save}
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
