import { Monitor, Moon, Sun } from "lucide-react";

import useTheme from "./useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      value: "light",
      icon: Sun,
    },

    {
      value: "dark",
      icon: Moon,
    },

    {
      value: "system",
      icon: Monitor,
    },
  ];

  const currentIndex = themes.findIndex((item) => item.value === theme);

  const currentTheme = themes[currentIndex];

  const CurrentIcon = currentTheme.icon;

  const handleToggle = () => {
    const nextIndex = (currentIndex + 1) % themes.length;

    setTheme(themes[nextIndex].value);
  };

  return (
    <button
      onClick={handleToggle}
      className="
        group
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        border
        border-[#d7e0e7]
        bg-white/80
        text-[#274c77]
        shadow-sm
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-[2px]
        hover:border-[#6096ba]
        hover:bg-[#e7ecef]
        hover:shadow-lg
        dark:border-[#365d86]/30
        dark:bg-[#274c77]/20
        dark:text-[#a3cef1]
        dark:hover:bg-[#365d86]/20
      "
    >
      {/* EFECTO */}
      <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CurrentIcon
        size={19}
        className="
          relative
          z-10
          transition-transform
          duration-300
          group-hover:scale-110
        "
      />
    </button>
  );
}
