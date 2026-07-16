import { ModernButton } from "@/components/buttons";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { FORM_FIELDS } from "../constants/contactData.js";

const EMPTY = {
  nombre: "",
  correo: "",
  empresa: "",
  telefono: "",
  mensaje: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mapeamos los campos del estado hacia los parámetros que recibirá tu plantilla de EmailJS
    const templateParams = {
      from_name: values.nombre,
      user_email: values.correo,
      company: values.empresa || "No especificada",
      phone: values.telefono || "No especificado",
      message: values.mensaje,
      time: new Date().toLocaleString("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    // Reutilizamos tus mismas credenciales expuestas temporales
    emailjs
      .send(
        "service_vj08bgm",
        "template_ianlekb", // Nota: Puedes usar el mismo service, pero lo ideal es que en EmailJS crees un template exclusivo para esto.
        templateParams,
        "3kx4H0jM5Gq2uayHH",
      )
      .then(
        () => {
          setSent(true);
          setValues(EMPTY);
          setLoading(false);
          setTimeout(() => setSent(false), 5000);
        },
        (error) => {
          alert("Hubo un error al enviar el formulario. Por favor, intenta de nuevo.");
          setLoading(false);
        },
      );
  };

  return (
    <section className="relative overflow-hidden bg-dark text-dark-foreground px-4 sm:px-6 md:px-8 lg:px-10 z-10 pb-24">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 shadow-2xl transform-gpu"
      >
        {/* Luz ambiental interna sutil */}
        <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

        <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">Escríbenos</h2>
        <p className="mt-1 text-sm text-dark-foreground/65">
          Completa el formulario y un asesor se pondrá en contacto contigo.
        </p>

        {/* Grid de Inputs dinámicos */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {FORM_FIELDS.map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label
                htmlFor={field.name}
                className="text-xs font-semibold uppercase tracking-wider text-dark-foreground/75"
              >
                {field.label}
                {field.required && <span className="text-primary"> *</span>}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={values[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                disabled={loading}
                className="h-11 w-full rounded-xl border border-white/10 bg-dark/40 px-4 text-sm text-white placeholder-dark-foreground/30 outline-none transition-all duration-300 focus:border-primary focus:bg-dark/60 focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              />
            </div>
          ))}
        </div>

        {/* Textarea de Mensaje */}
        <div className="mt-5 flex flex-col gap-1.5">
          <label htmlFor="mensaje" className="text-xs font-semibold uppercase tracking-wider text-dark-foreground/75">
            Mensaje<span className="text-primary"> *</span>
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            value={values.mensaje}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Cuéntanos qué necesitas para tu negocio..."
            className="w-full rounded-xl border border-white/10 bg-dark/40 px-4 py-3 text-sm text-white placeholder-dark-foreground/30 outline-none transition-all duration-300 focus:border-primary focus:bg-dark/60 focus:ring-2 focus:ring-primary/20 resize-none disabled:opacity-50"
          />
        </div>

        {/* Botón de Enviar */}
        <div className="mt-6">
          <motion.div
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="w-full transform-gpu"
          >
            <ModernButton
              type="submit"
              text={loading ? "Enviando..." : "Enviar mensaje"}
              icon={Send}
              variant="primary"
              disabled={loading}
              className="w-full justify-center py-3"
            />
          </motion.div>
        </div>

        {/* Notificación de Éxito Animada */}
        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 z-20 flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/10 backdrop-blur-md px-4 py-3.5 text-sm font-semibold text-accent shadow-lg"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Mensaje enviado con éxito. Te contactaremos pronto.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  );
}
