import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { ThemeToggle } from "@/components/theme";

export default function AppHeader({ onToggleAside }) {
  const [headerTime, setHeaderTime] = useState({
    greeting: "¡Hola!",
    dateStr: "",
  });

  useEffect(() => {
    const updateHeaderTime = () => {
      const now = new Date();
      const hours = now.getHours();

      let greeting = "¡Buenas noches!";
      if (hours >= 6 && hours < 12) greeting = "¡Buenos días!";
      else if (hours >= 12 && hours < 19) greeting = "¡Buenas tardes!";

      const dateStr = now.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setHeaderTime({ greeting, dateStr });
    };

    updateHeaderTime();

    const interval = setInterval(updateHeaderTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-2xl dark:border-slate-800/60 dark:bg-slate-950/70">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            <span className="sm:hidden">{headerTime.greeting}</span>
            <span className="hidden sm:inline">{headerTime.greeting} Bienvenido de nuevo</span>
          </h1>

          <p className="mt-0.5 hidden truncate text-xs font-medium capitalize text-slate-400 dark:text-slate-500 sm:block">
            {headerTime.dateStr}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          <ModernButton
            icon={Menu}
            text=""
            size="icon"
            variant="ghost"
            onClick={onToggleAside}
            className="border border-slate-200/70 bg-white/70 shadow-sm hover:bg-slate-100 dark:border-slate-800/70 dark:bg-slate-900/70 dark:hover:bg-slate-800 lg:hidden"
          />
        </div>
      </div>
    </header>
  );
}
