import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, description, align = "center", className = "" }) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`flex max-w-2xl flex-col gap-4 ${
        isCenter ? "mx-auto items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-pretty text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </motion.div>
  );
}
