import { Input, PasswordInput } from "@/components/forms/";
import { LockKeyhole, Mail, Phone, User } from "lucide-react";

export default function UserStep({ form, handleChange }) {
  return (
    <div className="grid grid-cols-1 gap-5">
      <legend className="sr-only">Información de la cuenta de usuario</legend>

      <Input
        label="Nombre completo"
        name="name"
        placeholder="Juan Pérez"
        value={form.name || ""}
        onChange={handleChange}
        icon={User}
        required
      />
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="correo@gmail.com"
        value={form.email || ""}
        onChange={handleChange}
        icon={Mail}
        required
      />
      <Input
        label="Teléfono personal"
        name="phone"
        placeholder="999 999 999"
        value={form.phone || ""}
        onChange={handleChange}
        icon={Phone}
      />
      <PasswordInput
        label="Contraseña de acceso"
        name="password"
        placeholder="••••••••"
        value={form.password || ""}
        onChange={handleChange}
        icon={LockKeyhole}
        required
        requireStrength={true}
      />
    </div>
  );
}
