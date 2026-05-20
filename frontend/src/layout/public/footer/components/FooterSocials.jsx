import { User } from "lucide-react";

const socials = [
  {
    icon: User,
  },
];

export default function FooterSocials() {
  return (
    <div className="flex gap-4">
      {socials.map((social, index) => {
        const Icon = social.icon;

        return (
          <button
            key={index}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-zinc-200
              transition-all
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
}
