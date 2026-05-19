import {
  Mail,
  LockKeyhole,
  User,
  Phone,
  AtSign,
} from "lucide-react";

import {
  Input,
  PasswordInput,
} from "@/components/inputs";

export default function UserStep({
  form,
  handleChange,
}) {

  return (

    <div className="space-y-5">

      {/* ======================================
          USER INFO
      ====================================== */}

      <div className="grid gap-5 md:grid-cols-2">

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
          label="Teléfono"
          name="phone"
          placeholder="999 999 999"
          value={form.phone || ""}
          onChange={handleChange}
          icon={Phone}
        />

      </div>

      {/* ======================================
          USERNAME / SLUG
      ====================================== */}

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
          EMAIL
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

      {/* ======================================
          PASSWORD
      ====================================== */}

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

  );

}