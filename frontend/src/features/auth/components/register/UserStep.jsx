import { Input, PasswordInput } from "@/components/forms/";
import { AtSign, LockKeyhole, Mail, Phone, User } from "lucide-react";

export default function UserStep({ form, handleChange }) {
  return (
    // 1. Convertimos a <fieldset> para mejorar la accesibilidad en formularios por pasos
    <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
      {/* Leyenda oculta visualmente pero accesible para lectores de pantalla */}
      <legend className="sr-only">Información de la cuenta de usuario</legend>

      {/* ======================================
          BLOQUE: IDENTIDAD (Fila 1 en Desktop)
      ====================================== */}
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

      {/* ======================================
          BLOQUE: CONTACTO (Fila 2 en Desktop)
      ====================================== */}
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
        label="Teléfono"
        name="phone"
        placeholder="999 999 999"
        value={form.phone || ""}
        onChange={handleChange}
        icon={Phone}
      />

      {/* ======================================
          BLOQUE: SEGURIDAD (Fila 3 - Ancho Completo)
      ====================================== */}
      {/* Usamos md:col-span-2 para que la contraseña abarque todo el ancho de forma limpia */}
      <div className="md:col-span-2">
        <PasswordInput
          label="Contraseña"
          name="password"
          placeholder="••••••••"
          value={form.password || ""}
          onChange={handleChange}
          icon={LockKeyhole}
          required
        />
      </div>
    </fieldset>
  );
}
