import { socials } from "../constants/socialsLinks";

export default function FooterSocials() {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      {socials.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          title={social.label}
          className="transition-all duration-300 hover:-translate-y-0.5"
        >
          <button
            aria-label={social.label}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/70 bg-white/40 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/10"
          >
            <img
              src={social.image}
              alt={social.label}
              className="h-5 w-5 object-contain"
              loading="lazy"
            />
          </button>
        </a>
      ))}
    </div>
  );
}
