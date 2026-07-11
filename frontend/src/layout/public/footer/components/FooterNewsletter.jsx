import { ModernButton } from "@/components/buttons";
import { Input } from "@/components/forms/";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Parámetros emparejados exactamente con las llaves {{ }} de tu plantilla HTML en EmailJS
    const templateParams = {
      user_email: email,
      message: "Hola, necesito comunicarme contigo.",
      time: new Date().toLocaleString("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      }), // Genera un formato elegante: "11 jul 2026, 14:30"
    };

    emailjs
      .send(
        "service_vj08bgm",
        "template_j5f1bos",
        templateParams,
        "3kx4H0jM5Gq2uayHH",
      )
      .then(
        () => {
          alert("¡Solicitud enviada con éxito! Nos comunicaremos pronto.");
          setEmail("");
          setLoading(false);
        },
        () => {
          alert("Hubo un error al enviar. Por favor, intenta de nuevo.");
          setLoading(false);
        },
      );
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm text-left">
      <h3 className="text-xs font-bold tracking-wider uppercase text-[#0f172a] dark:text-white/90">
        Suscríbete
      </h3>

      <p className="text-sm font-medium text-slate-500 dark:text-[#cbd5e1]/60">
        ¿Quieres que nos comuniquemos contigo? Déjanos tu correo aquí.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-2 flex items-center gap-2 w-full transform-gpu"
      >
        <div className="flex-1 min-w-0">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            disabled={loading}
            className="w-full h-11 bg-white/50 backdrop-blur-md border-slate-200/80 text-sm focus:border-[#274c77] dark:bg-slate-900/40 dark:border-white/5 dark:focus:border-[#a3cef1] transition-all duration-200"
          />
        </div>

        <ModernButton
          type="submit"
          text={loading ? "Enviando..." : "Enviar"}
          variant="primary"
          disabled={loading}
          className="h-11 px-5 font-semibold text-sm shadow-sm transition-all duration-200 active:scale-95"
        />
      </form>
    </div>
  );
}
