import { Input, PasswordInput } from "@/components/forms/";
import { AtSign, LockKeyhole, Mail, Phone, User } from "lucide-react";

export default function UserStep({ form, handleChange }) {
  return (
    // Cambiado de grid-cols-1 a soportar md:grid-cols-2 de forma equilibrada
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
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
        label="Nombre de usuario"
        name="slug"
        placeholder="juanperez"
        value={form.slug || ""}
        onChange={handleChange}
        icon={AtSign}
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

      <div className="md:col-span-2">
        <PasswordInput
          label="Contraseña de acceso"
          name="password"
          placeholder="••••••••"
          value={form.password || ""}
          onChange={handleChange}
          icon={LockKeyhole}
          required
        />
      </div>
    </div>
  );
}
