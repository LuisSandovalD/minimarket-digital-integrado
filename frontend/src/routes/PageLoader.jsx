
const PageLoader3D = () => {
  return (
    <>
      {/* 
        Inyectamos los Keyframes de la animación 3D de forma dinámica 
        para que no tengas que modificar tu archivo tailwind.config.js
      */}
      <style>{`
        @keyframes spin3d {
          0% { transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg); }
          50% { transform: rotateX(200deg) rotateY(180deg) rotateZ(180deg); }
          100% { transform: rotateX(380deg) rotateY(360deg) rotateZ(360deg); }
        }
        .animate-custom-3d {
          animation: spin3d 8s linear infinite;
        }
      `}</style>

      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-950 p-6 overflow-hidden select-none font-sans">
        {/* Contenedor de la escena con Perspectiva 3D */}
        <div className="relative h-32 w-32" style={{ perspective: "1000px" }}>
          {/* Cubo 3D Rotatorio */}
          <div
            className="absolute inset-0 animate-custom-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* CARA FRONTAL */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/40 border border-white/20 rounded-2xl backdrop-blur-md"
              style={{ transform: "translateZ(4rem)" }}
            />

            {/* CARA TRASERA */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/40 border border-white/10 rounded-2xl backdrop-blur-md"
              style={{ transform: "rotateY(180deg) translateZ(4rem)" }}
            />

            {/* CARA IZQUIERDA */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-indigo-400/40 border border-white/20 rounded-2xl backdrop-blur-md"
              style={{ transform: "rotateY(-90deg) translateZ(4rem)" }}
            />

            {/* CARA DERECHA */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-400/40 border border-white/20 rounded-2xl backdrop-blur-md"
              style={{ transform: "rotateY(90deg) translateZ(4rem)" }}
            />

            {/* CARA SUPERIOR */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-purple-400/20 to-indigo-400/40 border border-white/20 rounded-2xl backdrop-blur-md"
              style={{ transform: "rotateX(90deg) translateZ(4rem)" }}
            />

            {/* CARA INFERIOR */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-slate-900/60 border border-white/10 rounded-2xl backdrop-blur-md"
              style={{ transform: "rotateX(-90deg) translateZ(4rem)" }}
            />
          </div>

          {/* Sombra/Brillo inferior reflejado en el suelo */}
          <div
            className="absolute -bottom-12 left-2 right-2 h-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl rounded-full animate-pulse"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Sección de Textos Elegantes */}
        <div className="mt-16 text-center z-10 space-y-3">
          <h2
            className="text-lg font-light tracking-[0.25em] text-white/90 uppercase animate-pulse"
            style={{ animationDuration: "2.5s" }}
          >
            Iniciando Experiencia
          </h2>

          {/* Línea decorativa minimalista */}
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />

          <p className="text-[10px] font-mono tracking-[0.4em] text-indigo-400/50 uppercase">
            Cargando entorno digital
          </p>
        </div>
      </div>
    </>
  );
};

export default PageLoader3D;
