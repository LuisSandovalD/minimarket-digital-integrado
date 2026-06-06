import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { ModernButton } from "@/components/buttons/";
import { Input } from "@/components/forms/";
import { benefits } from "../constants/benefits";
import { inputs } from "../constants/inputs";
import {
  fadeUp,
  fadeScale,
  hoverLift,
  smoothTransition,
  springTransition,
  staggerContainer,
  defaultViewport,
} from "@/components/effects";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative mx-auto grid max-w-7xl items-start gap-14 px-6 lg:grid-cols-2 lg:px-8">
        {/* Left */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-xl"
        >
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="inline-flex items-center gap-2 rounded-full border border-[#d7e0e7] bg-white/70 px-4 py-2 text-sm font-semibold text-[#274c77] shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-[#dbeafe]"
          >
            <MessageSquare size={16} />
            Formulario de contacto
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-8 text-5xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white"
          >
            Hablemos sobre tu
            <span className="mt-2 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              próximo ERP
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-6 text-base leading-relaxed text-[#475569] dark:text-[#cbd5e1]"
          >
            Cuéntanos qué necesita tu empresa y nuestro equipo te ayudará a
            encontrar una solución moderna, escalable y preparada para crecer.
          </motion.p>

          {/* Benefits */}
          <motion.div variants={staggerContainer} className="mt-10 space-y-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeScale}
                transition={springTransition}
                whileHover={hoverLift}
                className="flex items-start gap-4 rounded-3xl border border-[#d7e0e7] bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6096ba] to-[#274c77] text-white shadow-lg"
                >
                  <Icon size={20} />
                </motion.div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a] dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#64748b] dark:text-[#cbd5e1]">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — form card */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-[#d7e0e7] bg-white/70 p-7 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)] md:p-10"
        >
          <h3 className="text-3xl font-black text-[#0f172a] dark:text-white">
            Solicita información
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748b] dark:text-[#cbd5e1]">
            Completa el formulario y nuestro equipo se pondrá en contacto
            contigo.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              {inputs.map((item, index) => (
                <Input
                  key={index}
                  type={item.type}
                  name={item.name}
                  label={item.label}
                  icon={item.icon}
                  placeholder={item.placeholder}
                  value={formData[item.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            {/* Textarea */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#334155] dark:text-[#dbe4ee]">
                Mensaje
              </label>
              <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 backdrop-blur-xl transition-all duration-300 focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/80 dark:focus-within:border-zinc-600 dark:focus-within:ring-zinc-800/50">
                <div className="absolute left-4 top-5 text-zinc-400">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto, empresa o necesidades..."
                  required
                  className="min-h-[180px] w-full resize-none bg-transparent pb-4 pl-12 pr-4 pt-5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-white"
                />
              </div>
            </div>

            <ModernButton
              type="submit"
              text="Enviar mensaje"
              icon={Send}
              loading={loading}
              size="lg"
              fullWidth
              once
            />
          </form>
        </motion.div>
      </div>
    </section>
  );
}
