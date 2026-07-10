import { ShoppingCart } from "lucide-react";

const PageLoader3D = () => {
  return (
    <>
      <style>{`
        @keyframes float3D {
          0% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-10px) rotateY(10deg); }
          100% { transform: translateY(0px) rotateY(0deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8) rotateX(70deg); opacity: 0.3; }
          50% { transform: scale(1.1) rotateX(70deg); opacity: 0.7; }
          100% { transform: scale(0.8) rotateX(70deg); opacity: 0.3; }
        }
        .animate-float-3d {
          animation: float3D 4s ease-in-out infinite;
        }
        .animate-ring-3d {
          animation: pulseRing 3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 overflow-hidden select-none font-sans transition-colors duration-500">
        {/* Contenedor de la Escena 3D */}
        <div
          className="relative h-44 w-44 flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {/* Icono Lucide con efecto de levitación y profundidad */}
          <div
            className="z-10 text-indigo-600 dark:text-indigo-400 animate-float-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            <ShoppingCart
              size={56}
              strokeWidth={1.2}
              className="drop-shadow-[0_10px_15px_rgba(99,102,241,0.2)] dark:drop-shadow-[0_12px_24px_rgba(99,102,241,0.4)]"
            />
          </div>

          {/* Anillo Holográfico Proyectado en el Suelo */}
          <div className="absolute bottom-4 w-28 h-28 border-2 border-dashed border-indigo-500/40 dark:border-indigo-400/30 rounded-full animate-ring-3d" />

          {/* Destello/Sombra de Núcleo */}
          <div
            className="absolute bottom-6 w-12 h-4 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 dark:from-indigo-500/20 dark:to-purple-500/20 blur-md rounded-full"
            style={{ transform: "rotateX(70deg)" }}
          />
        </div>

        {/* Textos Corporativos Minimalistas */}
        <div className="mt-8 text-center z-10 space-y-2.5">
          <h2 className="text-sm font-medium tracking-[0.3em] text-slate-800 dark:text-slate-200 uppercase">
            Plataforma Digital
          </h2>

          <div className="h-[1px] w-8 bg-slate-300 dark:bg-slate-800 mx-auto" />

          <p className="text-[10px] font-mono tracking-[0.25em] text-slate-400 dark:text-slate-500 uppercase">
            Sincronizando entorno
          </p>
        </div>
      </div>
    </>
  );
};

export default PageLoader3D;
