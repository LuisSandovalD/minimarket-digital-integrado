import { Building2, ShieldCheck, Store } from "lucide-react";

const steps = [
  { id: 1, title: "Usuario", icon: ShieldCheck },
  { id: 2, title: "Empresa", icon: Building2 },
  { id: 3, title: "Sucursal", icon: Store },
];

export default function RegisterStepper({ step }) {
  return (
    <div className="border-b border-slate-200/60 px-8 py-6 dark:border-white/10 bg-white dark:bg-transparent pb-10">
      <div className="mx-auto flex w-full max-w-xl items-center justify-center">
        {steps.map((item, index) => {
          const Icon = item.icon;
          const active = step === item.id;
          const completed = step > item.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={item.id} className={`flex items-center ${isLast ? "flex-none" : "flex-1"}`}>
              {/* CONTENEDOR VÉRTICE (Ícono + Texto) */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${active ? "border-[#274c77] bg-[#274c77] text-white shadow-md shadow-[#274c77]/20" : completed ? "border-[#6096ba] bg-[#6096ba]/10 text-[#274c77] dark:text-[#6096ba]" : "border-slate-200 bg-white text-slate-400 dark:border-white/10 dark:bg-slate-900"}`}
                >
                  <Icon size={18} />
                </div>

                {/* TEXTO DEL PASO */}
                <span
                  className={`absolute top-14 whitespace-nowrap text-xs font-semibold tracking-wide ${active ? "text-[#274c77] dark:text-blue-400" : completed ? "text-slate-500 dark:text-slate-400 font-medium" : "text-slate-400 dark:text-slate-600 font-medium"}`}
                >
                  {item.title}
                </span>
              </div>

              {/* LÍNEA CONECTORA INTERMEDIA (Transición de ancho nativa) */}
              {!isLast && (
                <div className="mx-4 flex-1">
                  <div className="h-0.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#274c77] transition-all duration-300 ease-in-out"
                      style={{ width: completed ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
