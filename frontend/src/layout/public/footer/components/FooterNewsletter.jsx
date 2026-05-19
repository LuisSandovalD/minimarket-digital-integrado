import {
  Input,
} from "@/components/inputs";

import {
  ModernButton,
} from "@/components/buttons";

export default function FooterNewsletter() {
  return (
    <div className="max-w-md">
      <h3 className="text-lg font-bold">
        Suscríbete
      </h3>

      <p
        className="
          mt-3
          text-sm
          text-zinc-500
        "
      >
        Recibe novedades y actualizaciones.
      </p>

      <div className="mt-5 flex gap-3">
        <Input
          placeholder="correo@gmail.com"
        />

        <ModernButton text="Enviar" />
      </div>
    </div>
  );
}